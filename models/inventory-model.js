const pool = require('../database/connection');

async function getAllVehicles() {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY inv_id');
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

module.exports = { getAllVehicles };