/* ******************************************
 * Node.js + Express Server with PostgreSQL
 * ******************************************/
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();

/* ******************************************
 * Serve Static Files
 * ******************************************/
app.use(express.static(path.join(__dirname, "public")));

/* ******************************************
 * EJS Setup
 * ******************************************/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ******************************************
 * Database Configuration
 * ******************************************/
const pool = new Pool({
  user: process.env.DB_USER || "cse340",
  host: process.env.DB_HOST || "dpg-d6j0ro7gi27c73e7kje0-a.oregon-postgres.render.com",
  database: process.env.DB_NAME || "cse340_0vp4",
  password: process.env.DB_PASS || "Lb9fq65Yk42rGoznOoZoUEQoJUUSMDNg",
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false }
});

/* ******************************************
 * Routes
 * ******************************************/
app.get("/", (req, res) => {
  res.render("index"); // render index.ejs
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Database connected! Current time: ${result.rows[0].now}`);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).send("Database connection failed");
  }
});

/* ******************************************
 * Start Server
 * ******************************************/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});