// db/index.js
const pg = require("pg")

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // make sure this is set in Render
})

module.exports = pool