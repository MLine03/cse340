const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities"); // make sure this file exists

// GET registration page
router.get("/register", async (req, res) => {
  const nav = await utilities.getNav();
  res.render("account/register", { title: "Register", nav });
});

// POST registration
router.post(
  "/register",
  accountController.registerAccount
);

// Temporary login route for testing
router.post("/login", (req, res) => {
  res.status(200).send("login process");
});

module.exports = router;
