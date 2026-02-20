const pool = require("../database");

async function getAllVehicles() {
  try {
    const result = await pool.query("SELECT * FROM inventory");
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    return [];
  }
}

async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (error) {
    console.error("Database query error:", error);
    return null;
  }
}

module.exports = { getAllVehicles, getVehicleById };