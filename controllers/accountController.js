import bcrypt from "bcryptjs";
import { getAccountById, updateAccount, updatePassword } from "../models/accountsModel.js";

// Account management page
export const accountManagementView = async (req, res) => {
  try {
    const account = await getAccountById(req.account.account_id);
    res.render("account/account-management", { title: "Account Management", account });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Update account form page
export const updateAccountView = async (req, res) => {
  try {
    const account = await getAccountById(req.params.id);
    res.render("account/update-account", { title: "Update Account", account });
  } catch (error) {
    res.status(500).send("Server Error");
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
    res.status(500).send("Server Error");
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
    res.status(500).send("Server Error");
  }
};