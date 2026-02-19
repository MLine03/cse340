const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const authRouter = require("./routes/auth");
const inventoryRouter = require("./routes/inventory");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// POST data parsing
app.use(express.urlencoded({ extended: true }));

// Session & flash
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(flash());

// Middleware for navigation and messages
app.use((req, res, next) => {
  res.locals.nav = [
    { name: "Home", link: "/" },
    { name: "Inventory", link: "/inv" },
  ];

  if (req.session.loggedIn) {
    res.locals.nav.push(
      { name: "Add Classification", link: "/inv/add-classification" },
      { name: "Add Inventory", link: "/inv/add-inventory" },
      { name: "Logout", link: "/auth/logout" }
    );
  } else {
    res.locals.nav.push({ name: "Login", link: "/auth/login" });
  }

  res.locals.message = req.flash("message") || "";
  next();
});

// Routes
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.use("/auth", authRouter);
app.use("/inv", inventoryRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { title: "Page Not Found", message: "404 - Page Not Found" });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { title: "Server Error", message: "500 - Internal Server Error" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
