import express from "express";
import pool from "../database/pool.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login page
router.get("/login", (req, res) => {
  res.render("accounts/login", { title: "Login" });
});

// Login form submission
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM accounts WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render("accounts/login", { title: "Login", error: "Invalid credentials" });
  }

  // Create JWT
  const token = jwt.sign({ id: user.account_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/accounts");
});

// Account management page
router.get("/", (req, res) => {
  if (!req.user) return res.redirect("/accounts/login");
  res.render("accounts/account-management", { title: "Account Management", user: req.user });
});

export default router;