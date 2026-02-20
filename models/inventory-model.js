const pool = require('../database/connection');

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

module.exports = { getAllVehicles };