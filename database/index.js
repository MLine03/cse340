const { Pool } = require("pg")
require("dotenv").config()

const connectionString =
  process.env.DATABASE_URL || process.env.DEV_DATABASE_URL

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false
})

module.exports = pool