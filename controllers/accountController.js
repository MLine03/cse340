const accountModel = require("../models/account-model");
const { validationResult } = require("express-validator");

// Handle account registration
async function registerAccount(req, res, next) {
  try {
    const errors = validationResult(req);

    // Sticky values
    const { account_firstname, account_lastname, account_email } = req.body;

    if (!errors.isEmpty()) {
      return res.render("account/register", {
        title: "Register",
        nav: await require("../utilities").getNav(),
        errors: errors.array(),
        account_firstname,
        account_lastname,
        account_email,
      });
    }

    // Save account
    await accountModel.registerAccount(req.body);

    res.send("Account successfully registered!");
  } catch (err) {
    next(err);
  }
}

module.exports = { registerAccount };
