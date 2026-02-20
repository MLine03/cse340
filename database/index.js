// database/index.js
const { Pool } = require("pg");

// Use the DATABASE_URL environment variable provided by Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render Postgres
  },
});

// Optional: simple test function to check connection
pool.connect()
  .then(client => {
    console.log("PostgreSQL connected successfully!");
    client.release();
  })
  .catch(err => console.error("PostgreSQL connection error:", err));

module.exports = pool;