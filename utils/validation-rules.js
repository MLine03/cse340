const { body } = require("express-validator");
const accountModel = require("../models/accountmodel");

/**
 * Registration validation rules
 */
const registerRules = [
  body("account_firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters."),

  body("account_lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters."),

  body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required.")
    .custom(async (account_email) => {
      const emailExists = await accountModel.checkExistingEmail(account_email);
      if (emailExists) {
        throw new Error("Email exists. Please log in or use a different email.");
      }
    }),

  body("account_password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
];

/**
 * Account update validation rules
 */
const updateAccountRules = [
  body("account_firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters."),

  body("account_lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters."),

  body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required.")
    .custom(async (account_email, { req }) => {
      // Check if the new email belongs to another user
      const account = await accountModel.getAccountByEmail(account_email);
      if (account && account.account_id != req.body.account_id) {
        throw new Error("Email exists. Please use a different email.");
      }
    })
];

/**
 * Password change validation rules
 */
const changePasswordRules = [
  body("account_password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
];

module.exports = {
  registerRules,
  updateAccountRules,
  changePasswordRules
};
