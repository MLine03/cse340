const pool = require('../database/connection');

async function getVehicleById(inventory_id) {
  const sql = `SELECT * FROM inventory WHERE inventory_id = $1`;
  const result = await pool.query(sql, [inventory_id]);
  return result.rows[0];
}

module.exports = { getVehicleById };