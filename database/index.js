const { Pool } = require("pg")
require("dotenv").config()

let pool

// Render production NEEDS SSL
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} else {
  // Local development (no SSL)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

module.exports = pool