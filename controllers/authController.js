import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/pool.js";
import dotenv from "dotenv";
dotenv.config();

// Show login page
export const loginView = (req, res) => {
  res.render("account/login", { title: "Login" });
};

// Handle login form submission
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM accounts WHERE email = ?", [email]);
    const account = rows[0];

    if (!account) {
      return res.render("account/login", { title: "Login", error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) {
      return res.render("account/login", { title: "Login", error: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { account_id: account.account_id, email: account.email, account_type: account.account_type },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/accounts/manage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};