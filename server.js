const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const indexRoute = require("./routes/indexRoute");
app.use("/", indexRoute);

// Start server
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
