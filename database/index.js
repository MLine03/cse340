const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Render Postgres
})

pool.on("connect", () => console.log("Database connected!"))

module.exports = pool