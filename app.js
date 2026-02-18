// app.js
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

// Import routes
const inventoryRoutes = require("./routes/inventoryRoute");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session & flash
app.use(session({
  secret: "someSecret",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// EJS & Layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main"); // default layout file: views/layouts/main.ejs

// Custom middleware to expose flash messages to views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/inventory", inventoryRoutes);

// Optional: root redirect
app.get("/", (req, res) => {
  res.redirect("/inventory");
});

module.exports = app;
