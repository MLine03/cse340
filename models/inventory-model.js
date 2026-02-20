const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function getVehiclesByClassification(classification_id) {
  try {
    const sql = 'SELECT * FROM inventory WHERE classification_id = $1';
    const result = await pool.query(sql, [classification_id]);
    return result.rows;
  } catch (error) {
    console.error('getVehiclesByClassification error:', error);
    throw error;
  }
}

async function getVehicleById(inv_id) {
  try {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (error) {
    console.error('getVehicleById error:', error);
    throw error;
  }
}

module.exports = { getVehiclesByClassification, getVehicleById };