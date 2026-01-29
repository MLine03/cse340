const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const accountRoute = require("./routes/accountRoute");
const utilities = require("./utilities");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/account", accountRoute);

// Home route
app.get("/", async (req, res) => {
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
