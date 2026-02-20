// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("path");

// Database connection
const pool = require("./database/db"); // your cse340_db connection

// Import routes
const homeRouter = require("./routes/home");
const inventoryRouter = require("./routes/inventory");
const inventoryRouteRouter = require("./routes/inventoryRoute");
const accountRouter = require("./routes/accountRoute");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/reviewRoute");
const staticRouter = require("./routes/static");
const errorRouter = require("./routes/errorRoute");
const indexRouter = require("./routes/indexRoute");

const app = express();
const PORT = process.env.PORT || 10000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(
  session({
    store: new pgSession({
      pool: pool, // Use the same pool as your database
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// Routes
app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/inventory", inventoryRouter);
app.use("/inventoryRoute", inventoryRouteRouter);
app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use("/reviews", reviewRouter);
app.use("/static", staticRouter);
app.use("/error", errorRouter);

// 404 error handler
app.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "404 - Page Not Found",
    message: "Sorry, the page you requested does not exist.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/500", {
    title: "500 - Internal Server Error",
    message: "Something went wrong on the server. Please try again later.",
    error: err,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});