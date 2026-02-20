// models/inventory-model.js
const pool = require('../utils/db-connection');

// Get all classifications
async function getClassifications() {
  const sql = 'SELECT * FROM classification ORDER BY classification_name ASC';
  const data = await pool.query(sql);
  return data;
}

// Insert a new classification
async function addClassification(classification_name) {
  const sql = 'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *';
  const data = await pool.query(sql, [classification_name]);
  return data;
}

// Insert a new vehicle
async function addVehicle(vehicle) {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = vehicle;
  const sql = `
    INSERT INTO inventory 
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`;
  const data = await pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color]);
  return data;
}

module.exports = {
  getClassifications,
  addClassification,
  addVehicle,
};