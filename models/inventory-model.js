const pool = require("../database/db");

async function getAllVehicles() {
  const result = await pool.query("SELECT * FROM vehicles ORDER BY inv_id ASC");
  return result.rows;
}

async function getVehicleById(inv_id) {
  const result = await pool.query("SELECT * FROM vehicles WHERE inv_id = $1", [inv_id]);
  return result.rows[0];
}

module.exports = { getAllVehicles, getVehicleById };