import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as accountModel from "../models/accountsModel.js";

// Show account management view
export const manageAccount = async (req, res) => {
  const account = req.account;
  res.render("account/management", { account });
};

// Show update form
export const showUpdateForm = async (req, res) => {
  const { id } = req.params;
  const account = await accountModel.getAccountById(id);
  res.render("account/update", { account, errors: [] });
};

// Process account info update
export const updateAccount = async (req, res) => {
  const { account_id, firstname, lastname, email } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email) {
    errors.push("All fields are required.");
  }

  const updated = await accountModel.updateAccount({
    account_id,
    firstname,
    lastname,
    email,
  });

  if (!updated) errors.push("Failed to update account.");

  const account = await accountModel.getAccountById(account_id);
  res.render("account/management", { account, errors });
};

// Process password change
export const changePassword = async (req, res) => {
  const { account_id, password } = req.body;
  const errors = [];

  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const updated = await accountModel.updatePassword(account_id, hashedPassword);

  if (!updated) errors.push("Failed to update password.");

  const account = await accountModel.getAccountById(account_id);
  res.render("account/management", { account, errors });
};