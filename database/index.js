const { Pool } = require("pg")

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "cse340",
  user: "mac",  // your Mac username
})

module.exports = pool
