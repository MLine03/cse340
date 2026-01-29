const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const accountModel = require("../models/account-model");

// GET registration page
router.get("/register", async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.render("account/register", {
      title: "Register",
      nav,
      errors: [],
      account_firstname: "",
      account_lastname: "",
      account_email: "",
      messages: {
        success: req.flash("success"),
        error: req.flash("error")
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST registration
router.post(
  "/register",
  [
    body("account_firstname").trim().isLength({ min: 1 }).withMessage("First name is required"),
    body("account_lastname").trim().isLength({ min: 1 }).withMessage("Last name is required"),
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required")
      .custom(async (email) => {
        const exists = await accountModel.checkExistingEmail(email);
        if (exists) {
          throw new Error("Email exists. Please log in or use a different email");
        }
      }),
    body("account_password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  accountController.registerAccount
);

module.exports = router;
