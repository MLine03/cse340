// testdb.js
const { Pool } = require("pg");

// Create a connection pool
const pool = new Pool({
  user: "mac",          // your Postgres username
  host: "localhost",    // usually localhost
  database: "cse340",   // the database you want to connect to
  password: "",         // fill in if your DB has a password
  port: 5432,           // default Postgres port
});

(async () => {
  try {
    // Test 1: Check current database and user
    const result1 = await pool.query("SELECT current_database(), current_user");
    console.log("✅ Connected:", result1.rows[0]);

    // Test 2: Simple query to check DB
    const result2 = await pool.query("SELECT NOW()");
    console.log("Database is working!");
    console.log(result2.rows);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  } finally {
    await pool.end(); // close the connection pool
  }
})();
