// testConnection.js
const pool = require("./database/connection");

async function testQuery() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("Current time:", rows[0].now);
  } catch (err) {
    console.error("Query error:", err);
  }
}

testQuery();