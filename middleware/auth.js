// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to check if user is logged in
export const requireLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.account = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

// Middleware to check if user is employee/admin
export const requireEmployeeOrAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.account_type === "Employee" || decoded.account_type === "Admin") {
      req.account = decoded;
      return next();
    } else {
      return res.status(403).send("Access denied.");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};