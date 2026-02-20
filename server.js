require("dotenv").config();
const express = require("express");
const session = require("express-session");
const inventoryRouter = require("./routes/inventory");

const app = express();
const PORT = process.env.PORT || 10000;

// EJS
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use("/inventory", inventoryRouter);

// Home route
app.get("/", (req, res) => {
  res.redirect("/inventory");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});