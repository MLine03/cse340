// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("path");

// Routers
const inventoryRouter = require("./routes/inventory"); 
const classificationRouter = require("./routes/classification"); 

const app = express();
const PORT = process.env.PORT || 10000;

// Database pool
const pool = require("./database/db");

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(
  session({
    store: new pgSession({
      pool: pool,            // Use the PostgreSQL pool
      tableName: "session",  // Must match your session table
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
app.use("/inventory", inventoryRouter);
app.use("/classification", classificationRouter);

// Home route
app.get("/", (req, res) => {
  res.redirect("/inventory");
});

// Footer-based error route (Assignment 3)
app.get("/trigger-error", (req, res, next) => {
  try {
    // Intentionally throw an error
    throw new Error("This is a test 500 error triggered from the footer link!");
  } catch (err) {
    next(err); // Pass error to error handler middleware
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("errors/404", { title: "404 Page Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).render("errors/500", {
    title: "Server Error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});