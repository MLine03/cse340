const pool = require('../db/pool');

exports.getVehicleById = async (inv_id) => {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
  const result = await pool.query(sql, [inv_id]);
  return result.rows[0];
};

exports.getVehiclesByClassification = async (classification_id) => {
  const sql = 'SELECT * FROM inventory WHERE classification_id = $1';
  const result = await pool.query(sql, [classification_id]);
  return result.rows;
};