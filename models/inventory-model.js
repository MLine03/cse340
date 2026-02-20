const pool = require('../db');

async function getVehicleById(inv_id) {
  try {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const values = [inv_id];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error fetching vehicle: ' + error.message);
  }
}

module.exports = { getVehicleById };