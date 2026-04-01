import accountsModel from "../models/accounts-model.js"; // exact file name
import bcrypt from "bcryptjs";

export async function registerAccount(req, res, next) {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await accountsModel.registerAccount({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    if (result) {
      req.flash("message", "Registration successful!");
      res.redirect("/account/login");
    } else {
      res.render("account/register", {
        errors: [{ msg: "Registration failed" }],
        message: null,
      });
    }
  } catch (error) {
    next(error);
  }
}