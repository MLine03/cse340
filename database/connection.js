const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/jones_surf_shop"
})

module.exports = pool
