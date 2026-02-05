// controllers/accountController.js
const accountModel = require("../models/accountmodel");
const { validationResult } = require("express-validator");

const getAccountManagement = (req, res) => {
  const user = req.user;
  res.render("account-management", {
    title: "Account Management",
    nav: [], // your nav helper here
    user,
    errors: [],
    success: [],
  });
};

const postAccountUpdate = async (req, res) => {
  const user = req.user;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("account-management", {
      title: "Account Management",
      nav: [],
      user,
      errors: errors.array(),
      success: [],
    });
  }

  try {
    const { account_firstname, account_lastname, account_email } = req.body;
    await accountModel.updateAccount(user.account_id, account_firstname, account_lastname, account_email);

    // Optionally update the JWT with new data here

    res.render("account-management", {
      title: "Account Management",
      nav: [],
      user: { ...user, account_firstname, account_lastname, account_email },
      errors: [],
      success: [{ msg: "Account information updated successfully." }],
    });
  } catch (error) {
    res.render("account-management", {
      title: "Account Management",
      nav: [],
      user,
      errors: [{ msg: "Failed to update account. Try again." }],
      success: [],
    });
  }
};

const postPasswordUpdate = async (req, res) => {
  const user = req.user;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("account-management", {
      title: "Account Management",
      nav: [],
      user,
      errors: errors.array(),
      success: [],
    });
  }

  try {
    const { account_password } = req.body;
    await accountModel.updatePassword(user.account_id, account_password);

    res.render("account-management", {
      title: "Account Management",
      nav: [],
      user,
      errors: [],
      success: [{ msg: "Password updated successfully." }],
    });
  } catch (error) {
    res.render("account-management", {
      title: "Account Management",
      nav: [],
      user,
      errors: [{ msg: "Failed to update password. Try again." }],
      success: [],
    });
  }
};

module.exports = {
  getAccountManagement,
  postAccountUpdate,
  postPasswordUpdate,
};
