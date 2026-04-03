import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import accountsRouter from "./routes/accounts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup EJS views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // for static files like CSS

// Make account info available to all views
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.account = decoded; // used in nav.ejs and account pages
    } catch (err) {
      res.locals.account = null;
    }
  } else {
    res.locals.account = null;
  }
  next();
});

// Routes
app.use("/accounts", accountsRouter);

// Home page
app.get("/", (req, res) => {
  res.render("home", { title: "Vehicle Inventory" });
});

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// 404 Error page
app.use((req, res) => {
  res.status(404).render("error", { title: "404 Not Found", message: "Page not found" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));