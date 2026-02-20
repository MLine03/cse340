// server.js
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("path");
require("dotenv").config();
const pool = require("./database"); // PostgreSQL connection

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session using PostgreSQL
app.use(session({
  store: new pgSession({
    pool: pool,              // Use your existing pg Pool
    tableName: 'session',    // Optional: table name in database
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/inventory", require("./routes/inventory"));

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { message: "Page Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.render("error", { message: err.message || "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));