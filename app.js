import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import accountsRouter from "./routes/accounts.js";
import { accountSession } from "./middleware/accountSession.js";

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(accountSession);

// Global nav for all views
app.use((req, res, next) => {
  res.locals.nav = req.account
    ? `<nav><a href="/accounts/manage">My Account</a> | <a href="/logout">Logout</a></nav>`
    : `<nav><a href="/accounts/login">Login</a></nav>`;
  next();
});

// Routers
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Vehicle Inventory" });
});

// Logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));