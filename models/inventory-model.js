const pool = require('../db/connection'); // your PostgreSQL pool

async function getVehiclesByClassification(classification_id) {
  try {
    const sql = 'SELECT * FROM inventory WHERE classification_id = $1';
    const values = [classification_id];
    const result = await pool.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error('getVehiclesByClassification error:', error);
    throw error;
  }
}

async function getVehicleById(inv_id) {
  try {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const values = [inv_id];
    const result = await pool.query(sql, values);
    return result.rows[0]; // single vehicle
  } catch (error) {
    console.error('getVehicleById error:', error);
    throw error;
  }
}

module.exports = {
  getVehiclesByClassification,
  getVehicleById
};