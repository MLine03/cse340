// routes/accountRoute.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import the account model (filename matches actual file: accountmodel.js)
const accountModel = require("../models/accountmodel");

// Utilities for navigation
const utilities = require("../utilities/getNav");

// ----------------------
// GET login page
// ----------------------
router.get("/login", (req, res) => {
  res.render("account/login", {
    title: "Login",
    nav: utilities.getNav(),
    error: [],
    success: []
  });
});

// ----------------------
// POST login
// ----------------------
router.post("/login", async (req, res) => {
  const { account_email, account_password } = req.body;

  // Input validation
  if (!account_email || !account_password) {
    return res.render("account/login", {
      title: "Login",
      nav: utilities.getNav(),
      error: ["Email and password are required."],
      success: []
    });
  }

  try {
    // Ensure JWT secret is set
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const user = await accountModel.getAccountByEmail(account_email);

    if (user && await bcrypt.compare(account_password, user.account_password)) {
      // Create JWT token
      const token = jwt.sign(
        {
          account_id: user.account_id,
          account_firstname: user.account_firstname,
          account_level: user.account_level
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      // Set JWT cookie
      res.cookie("jwt", token, { httpOnly: true });
      res.redirect("/account/management");
    } else {
      res.render("account/login", {
        title: "Login",
        nav: utilities.getNav(),
        error: ["Invalid email or password."],
        success: []
      });
    }
  } catch (err) {
    console.error(err);
    res.render("account/login", {
      title: "Login",
      nav: utilities.getNav(),
      error: ["Server error. Please try again."],
      success: []
    });
  }
});

// ----------------------
// GET logout
// ----------------------
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
