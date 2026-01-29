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
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/account", accountRoute);

// Home route
app.get("/", async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.render("index", { title: "Home", nav });
  } catch (err) {
    next(err);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`<pre>${err.stack}</pre>`);
});

// Start server
const PORT = 5500;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
