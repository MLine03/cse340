// models/inventory-model.js
const pool = require("../database/db"); // your PostgreSQL pool

async function getAllVehicles() {
  try {
    const result = await pool.query("SELECT * FROM vehicles");
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    return [];
  }
}

async function getVehicleById(inv_id) {
  try {
    const result = await pool.query("SELECT * FROM vehicles WHERE inv_id = $1", [inv_id]);
    return result.rows[0];
  } catch (error) {
    console.error("Database query error:", error);
    return null;
  }
}

module.exports = { getAllVehicles, getVehicleById };