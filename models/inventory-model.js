const pool = require('../db');

exports.getClassifications = async () => {
  const [rows] = await pool.query('SELECT * FROM classifications ORDER BY classification_name');
  return rows;
};

exports.insertClassification = async (name) => {
  const [result] = await pool.query('INSERT INTO classifications (classification_name) VALUES (?)', [name]);
  return result;
};

exports.insertVehicle = async ({ make, model, year, price, classification_id }) => {
  const [result] = await pool.query(
    'INSERT INTO inventory (make, model, year, price, classification_id) VALUES (?, ?, ?, ?, ?)',
    [make, model, year, price, classification_id]
  );
  return result;
};