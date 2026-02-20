// models/inventory-model.js
const pool = require("./db");

async function getAllVehicles() {
  try {
    const result = await pool.query("SELECT * FROM vehicles");
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    return [];
  }
}

module.exports = { getAllVehicles };