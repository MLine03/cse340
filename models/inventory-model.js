const pool = require("../database/connection");

// Get classifications
async function getClassifications() {
  const sql = "SELECT * FROM classification ORDER BY classification_name";
  return pool.query(sql);
}

// Add classification
async function addClassification(classification_name) {
  const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
  return pool.query(sql, [classification_name]);
}

// Add inventory
async function addInventory({
  classification_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_price,
  inv_miles,
  inv_color,
  inv_image,
  inv_thumbnail,
}) {
  const sql = `INSERT INTO inventory 
    (classification_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, inv_image, inv_thumbnail)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  return pool.query(sql, [
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_price,
    inv_miles,
    inv_color,
    inv_image,
    inv_thumbnail,
  ]);
}

module.exports = { getClassifications, addClassification, addInventory };
