const { Pool } = require("pg")
require("dotenv").config()

// Detect if running on Render cloud
const isRender = process.env.RENDER === "true"

console.log("ENV CHECK → RENDER =", process.env.RENDER)

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),

  // Use SSL ONLY when deployed on Render
  ssl: isRender ? { rejectUnauthorized: false } : false
})

// Test connection on startup
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => {
    console.error("❌ PostgreSQL connection FAILED")
    console.error(err.message)
  })

module.exports = pool