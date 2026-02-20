// server.js
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("path");
require("dotenv").config();
const pool = require("./database/db"); // PostgreSQL pool

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sessions with PostgreSQL
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/inventory", require("./routes/inventory")); // inventory routes

// Home route (optional)
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { title: "Server Error", message: "Internal Server Error" });
});

// 404
app.use((req, res) => {
  res.status(404).render("error", { title: "404 Not Found", message: "Page not found." });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});