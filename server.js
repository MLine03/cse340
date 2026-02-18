// server.js
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const inventoryRouter = require("./routes/inventoryRoute"); // inventory routes

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Sessions and flash messages
app.use(
  session({
    secret: "secret-key", // in production, use a strong secret from .env
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Middleware to make flash messages and nav available in all views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.nav = [
    { name: "Home", link: "/" },
    { name: "Inventory", link: "/inventory" },
    { name: "Add Vehicle", link: "/inventory/add-inventory" },
    { name: "Add Classification", link: "/inventory/add-classification" },
  ];
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "CSE Motors | Home" });
});

app.use("/inventory", inventoryRouter);

// Catch-all for 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
