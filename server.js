// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("path");
const pool = require("./database/db"); // Make sure this points to your PostgreSQL pool

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup
app.use(
  session({
    store: new pgSession({
      pool: pool,                // Use your pg pool
      tableName: "session",      // Must exist in DB
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "changeThisSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
const homeRoutes = require("./routes/home");
const inventoryRoutes = require("./routes/inventory");
const accountRoutes = require("./routes/accountRoute");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviewRoute");
const errorRoutes = require("./routes/errorRoute");

app.use("/", homeRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/reviews", reviewRoutes);
app.use("/error", errorRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("errors/404", { url: req.originalUrl });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/500", { error: err });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});