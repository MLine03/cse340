const express = require("express");
const app = express();
const path = require("path"); // needed for views folder path

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set views folder (optional if using default 'views' folder)
app.set("views", path.join(__dirname, "views"));

// Static files (REQUIRED for favicon, CSS, JS, images)
app.use(express.static("public"));

// Routes
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");

// Index route
app.get("/", baseController.buildHome);

// Inventory routes
app.use("/inv", inventoryRoute);

// Handle favicon request (extra safety — optional)
app.get("/favicon.ico", (req, res) => res.status(204));

// Server
const port = 5500;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});