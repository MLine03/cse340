const pool = require("./db");

async function getAllVehicles() {
  const [rows] = await pool.query("SELECT * FROM inventory ORDER BY inv_make, inv_model");
  return rows;
}

async function getInventoryById(inv_id) {
  const [rows] = await pool.query("SELECT * FROM inventory WHERE inv_id = ?", [inv_id]);
  return rows[0];
}

module.exports = {
  getAllVehicles,
  getInventoryById,
};