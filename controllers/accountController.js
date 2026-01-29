// controllers/accountController.js

const accountModel = require("../models/account-model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const utilities = require("../utilities");

exports.registerAccount = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // Sticky form values
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    const nav = await utilities.getNav();

    if (!errors.isEmpty()) {
      // Validation errors exist
      return res.render("account/register", {
        title: "Register",
        nav,
        errors: errors.array(),
        account_firstname,
        account_lastname,
        account_email,
        messages: { success: [], error: errors.array().map(err => err.msg) }, // send errors to messages
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(account_password, 10);

    // Register account in DB
    const regResult = await accountModel.registerAccount({
      account_firstname,
      account_lastname,
      account_email,
      account_password: hashedPassword,
    });

    if (regResult) {
      // Success message
      req.flash("success", "Registration successful! Please log in.");
      return res.redirect("/account/login");
    } else {
      // Generic failure
      return res.render("account/register", {
        title: "Register",
        nav,
        errors: [],
        account_firstname,
        account_lastname,
        account_email,
        messages: { success: [], error: ["Registration failed. Please try again."] },
      });
    }
  } catch (err) {
    next(err);
  }
};
