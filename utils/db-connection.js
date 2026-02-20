// utils/db-connection.js
const pg = require('pg');

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render/Postgres
  },
});

module.exports = pool;