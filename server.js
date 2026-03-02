/* ******************************************
 * Node.js + Express Server with PostgreSQL
 * ******************************************/
const express = require("express")
const { Pool } = require("pg")

const app = express()

/* ******************************************
 * Database Configuration using environment variables
 * ***************************************** */
const pool = new Pool({
    user: process.env.DB_USER || "cse340",
    host: process.env.DB_HOST || "dpg-d6j0ro7gi27c73e7kje0-a.oregon-postgres.render.com",
    database: process.env.DB_NAME || "cse340_0vp4",
    password: process.env.DB_PASS || "Lb9fq65Yk42rGoznOoZoUEQoJUUSMDNg",
    port: process.env.DB_PORT || 5432,
    ssl: { rejectUnauthorized: false }
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
const PORT = process.env.PORT || 3000

/* ***********************
 * Start Server
 * *********************** */
app.listen(PORT, () => {
    console.log(`Trial app listening on port ${PORT}`)
})