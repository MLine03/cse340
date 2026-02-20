const pool = require('../db/pool'); // your PostgreSQL pool setup

exports.getVehicleById = async (inv_id) => {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
  const values = [inv_id];
  const result = await pool.query(sql, values);
  return result.rows[0];
};

exports.getVehiclesByClassification = async (classification_id) => {
  const sql = 'SELECT * FROM inventory WHERE classification_id = $1';
  const values = [classification_id];
  const result = await pool.query(sql, values);
  return result.rows;
};