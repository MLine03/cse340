const pool = require('../db');

async function addClassification(classification_name) {
  const sql = 'INSERT INTO car_classification (classification_name) VALUES ($1) RETURNING classification_id';
  const result = await pool.query(sql, [classification_name]);
  return result.rows[0];
}

async function getAllClassifications() {
  const sql = 'SELECT * FROM car_classification ORDER BY classification_name';
  const result = await pool.query(sql);
  return result.rows;
}

module.exports = { addClassification, getAllClassifications };