// controllers/accountController.js
import { checkExistingEmail, registerAccount } from "../models/accountModel.js";

export async function registerView(req, res) {
  res.render("register");
}

export async function register(req, res) {
  const { account_email } = req.body;
  if (await checkExistingEmail(account_email)) {
    return res.send("Email already exists!");
  }
  await registerAccount(req.body);
  res.send("Registered successfully!");
}