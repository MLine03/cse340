const pool = require('../database/connection');

// Get all vehicles
async function getAllVehicles() {
  try {
    const sql = 'SELECT * FROM inventory ORDER BY inv_id';
    const result = await pool.query(sql);
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

// Get a vehicle by ID
async function getVehicleById(inv_id) {
  try {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

module.exports = {
  getAllVehicles,
  getVehicleById,
};