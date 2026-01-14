/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

/* ***********************
 * View Engine and Views Folder
 *************************/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // ✅ Corrected

/* ***********************
 * Static Files
 *************************/
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * Routes
 *************************/
const indexRoute = require("./routes/indexRoute");
app.use("/", indexRoute);

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
