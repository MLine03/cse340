// Correct import for the model
import accountsModel from "../models/accounts-model.js";
import bcrypt from "bcryptjs";

// Example registration function
export async function registerAccount(req, res, next) {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await accountsModel.registerAccount({ firstname, lastname, email, password: hashedPassword });
    if (result) {
      req.flash("message", "Registration successful!");
      res.redirect("/account/login");
    } else {
      res.render("account/register", { errors: [{ msg: "Registration failed" }] });
    }
  } catch (error) {
    next(error);
  }
}