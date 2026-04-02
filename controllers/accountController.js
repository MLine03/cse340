// controllers/accountController.js
import bcrypt from "bcryptjs";
import { getAccountById, updateAccount, updatePassword } from "../models/accountsModel.js";

// Account management page
export const accountManagementView = async (req, res) => {
  try {
    const account = await getAccountById(req.account?.account_id || 1); // placeholder if not logged in
    res.render("account/account-management", {
      title: "Account Management",
      account,
      message: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { title: "Server Error", message: "Cannot load account." });
  }
};

// Update account form page
export const updateAccountView = async (req, res) => {
  try {
    const account = await getAccountById(req.params.id);
    res.render("account/update-account", {
      title: "Update Account",
      account,
      message: null,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { title: "Server Error", message: "Cannot load account." });
  }
};

// Handle account info update
export const handleAccountUpdate = async (req, res) => {
  try {
    const { account_id, firstname, lastname, email } = req.body;
    const success = await updateAccount({ account_id, firstname, lastname, email });
    const account = await getAccountById(account_id);
    res.render("account/account-management", {
      title: "Account Management",
      account,
      message: success ? "Account updated successfully!" : "Update failed.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { title: "Server Error", message: "Update failed." });
  }
};

// Handle password change
export const handlePasswordUpdate = async (req, res) => {
  try {
    const { account_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const success = await updatePassword(account_id, hashedPassword);
    const account = await getAccountById(account_id);
    res.render("account/account-management", {
      title: "Account Management",
      account,
      message: success ? "Password updated successfully!" : "Password update failed.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { title: "Server Error", message: "Password update failed." });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};