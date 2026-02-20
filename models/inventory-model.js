const pool = require('../db/connection'); // your PostgreSQL pool

exports.getClassifications = async () => {
  return pool.query('SELECT * FROM classification ORDER BY classification_name');
};

exports.insertClassification = async (name) => {
  const sql = 'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *';
  const values = [name];
  const result = await pool.query(sql, values);
  return result.rows[0];
};

exports.insertVehicle = async ({ inv_make, inv_model, inv_year, classification_id }) => {
  const sql = `
    INSERT INTO inventory (inv_make, inv_model, inv_year, classification_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const values = [inv_make, inv_model, inv_year, classification_id];
  const result = await pool.query(sql, values);
  return result.rows[0];
};