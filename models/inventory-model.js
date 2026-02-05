const pool = require("../database/connection");

// Get all classifications
async function getClassifications() {
  const sql = `SELECT * FROM classifications ORDER BY classification_name`;
  const [rows] = await pool.execute(sql);
  return rows;
}

// Add a classification
async function addClassification(classification_name) {
  const sql = `INSERT INTO classifications (classification_name) VALUES (?)`;
  const [result] = await pool.execute(sql, [classification_name]);
  return result.affectedRows === 1;
}

// Add a vehicle
async function addVehicle(vehicle) {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, classification_id } = vehicle;
  const sql = `
    INSERT INTO inventory 
    (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, classification_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, classification_id];
  const [result] = await pool.execute(sql, params);
  return result.affectedRows === 1;
}

module.exports = {
  getClassifications,
  addClassification,
  addVehicle,
};
