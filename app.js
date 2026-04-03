import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import homeRouter from "./routes/home.js";
import accountsRouter from "./routes/accounts.js";
import inventoryRouter from "./routes/inventory.js";
import { accountSession } from "./middleware/accountSession.js";

dotenv.config();
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware for session/account handling
app.use(accountSession);

// Serve static files from public folder
app.use(express.static("public"));

// Routes
app.use("/", homeRouter);              // Home page route
app.use("/accounts", accountsRouter);  // Account management routes
app.use("/inventory", inventoryRouter); // Inventory routes

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// Error handling middleware for 500 Internal Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Internal Server Error",
  });
});

// 404 fallback for unmatched routes
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "Page Not Found",
    message: "404 - Page Not Found",
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));