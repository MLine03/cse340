/* ******************************************
 * Node.js + Express Server with PostgreSQL
 * ******************************************/
const express = require("express")
const { Pool } = require("pg")

const app = express()

/* ******************************************
 * Database Configuration
 * ***************************************** */
// 🔹 Replace the placeholders below with your Render.com PostgreSQL info
const pool = new Pool({
    user: "YOUR_DB_USER",          // e.g., cse340
    host: "YOUR_DB_HOST",          // e.g., db-name-abc123.render.com
    database: "YOUR_DB_NAME",      // e.g., cse340
    password: "YOUR_DB_PASSWORD",  // your DB password
    port: 5432,                    // default PostgreSQL port
    ssl: { rejectUnauthorized: false } // required for Render
})

/* ******************************************
 * Default GET route
 * ***************************************** */
app.get("/", (req, res) => {
    res.send("Welcome home!")
})

/* ******************************************
 * Test Database Route
 * ***************************************** */
app.get("/db-test", async (req, res) => {
    try {
        // simple test query to check DB connection
        const result = await pool.query("SELECT NOW()")
        res.send(`Database connected! Current time: ${result.rows[0].now}`)
    } catch (err) {
        console.error("Database error:", err.message)
        res.status(500).send("Database connection failed")
    }
})

/* ******************************************
 * Server host name and port
 * ***************************************** */
const HOST = 'localhost'
const PORT = 3000

/* ***********************
 * Start Server
 * *********************** */
app.listen(PORT, () => {
    console.log(`Trial app listening on ${HOST}:${PORT}`)
})