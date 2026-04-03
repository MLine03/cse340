const { Pool } = require("pg")
require("dotenv").config()

console.log("ENV CHECK → DATABASE_URL exists:", !!process.env.DATABASE_URL)

let pool

// If DATABASE_URL exists → we are on Render
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })
} else {
  // Local development connection
  pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  })
}

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => {
    console.error("❌ PostgreSQL connection FAILED")
    console.error(err)
  })

module.exports = pool