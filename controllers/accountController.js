// controllers/accountController.js
import bcrypt from "bcryptjs";
import accountModel from "../models/accountModel.js";
import { validationResult } from "express-validator";
import express from "express";

const accountController = {};

// Example: registration function
accountController.registerAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("accounts/register", { errors: errors.array() });
  }

  const { client_firstname, client_lastname, client_email, client_password } = req.body;
  const hashedPassword = await bcrypt.hash(client_password, 10);

  try {
    const result = await accountModel.registerAccount({
      client_firstname,
      client_lastname,
      client_email,
      client_password: hashedPassword,
    });

    if (result.rowCount === 1) {
      req.flash("success", "Account created successfully.");
      return res.redirect("/account/login");
    } else {
      req.flash("error", "Account creation failed.");
      return res.render("accounts/register");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Server error" });
  }
};

export default accountController;