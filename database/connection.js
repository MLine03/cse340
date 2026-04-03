const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render Postgres
  },
})

// optional: helpful logging
pool.on("connect", () => {
  console.log("Connected to PostgreSQL")
})

pool.on("error", (err) => {
  console.error("Unexpected DB error", err)
})

module.exports = pool