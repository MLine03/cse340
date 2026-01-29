const pool = require("../database/connection");

// Get all classifications
async function getClassifications() {
  const sql = "SELECT * FROM classification ORDER BY classification_name";
  return pool.query(sql);
}

// Add a new classification
async function addClassification(classification_name) {
  const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
  return pool.query(sql, [classification_name]);
}

// Add a new inventory item
async function addInventory({ classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color }) {
  const sql = `INSERT INTO inventory
               (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  return pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color]);
}

module.exports = {
  getClassifications,
  addClassification,
  addInventory,
};
