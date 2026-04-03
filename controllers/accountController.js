import bcrypt from "bcryptjs";
import { getAccountById, updateAccount, updatePassword } from "../models/accountsModel.js";

export const accountManagementView = async (req, res) => {
  try {
    if (!res.locals.account) return res.redirect("/login");

    const account = await getAccountById(res.locals.account.account_id);
    res.render("account/account-management", { title: "Account Management", account });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const updateAccountView = async (req, res) => {
  try {
    if (!res.locals.account) return res.redirect("/login");

    const account = await getAccountById(req.params.id);
    res.render("account/update-account", { title: "Update Account", account });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const handleAccountUpdate = async (req, res) => {
  try {
    const { account_id, firstname, lastname, email } = req.body;
    const success = await updateAccount({ account_id, firstname, lastname, email });
    const account = await getAccountById(account_id);
    res.render("account/account-management", {
      title: "Account Management",
      account,
      message: success ? "Account updated successfully!" : "Update failed."
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const handlePasswordUpdate = async (req, res) => {
  try {
    const { account_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const success = await updatePassword(account_id, hashedPassword);
    const account = await getAccountById(account_id);
    res.render("account/account-management", {
      title: "Account Management",
      account,
      message: success ? "Password updated successfully!" : "Password update failed."
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};