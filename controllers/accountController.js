const { validationResult } = require("express-validator");
const accountModel = require("../models/account-model");

exports.registerAccount = async (req, res) => {
  const nav = await require("../utilities").getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("account/register", {
      title: "Register",
      nav,
      errors: errors.array(),
      account_firstname,
      account_lastname,
      account_email,
      messages: { success: [], error: [] }
    });
  }

  try {
    const result = await accountModel.registerAccount(account_firstname, account_lastname, account_email, account_password);
    if (result) {
      req.flash("success", "You have successfully registered!");
      return res.redirect("/account/register");
    } else {
      req.flash("error", "Registration failed. Please try again.");
      return res.redirect("/account/register");
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "An unexpected error occurred. Please try again.");
    return res.redirect("/account/register");
  }
};
