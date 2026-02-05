const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const utilities = require("./utilities/getNav"); // simplified nav helper

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

// Routes
const accountRouter = require("./routes/accountRoute");
app.use("/account", accountRouter);

// Home route
app.get("/", (req, res) => {
  res.render("index", { 
    title: "Home", 
    nav: utilities.getNav(), 
    success: [],
    error: []
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).render("error", { 
    title: "404 - Page Not Found", 
    nav: utilities.getNav(),
    success: [],
    error: []
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
