// inventoryModel.js
const pool = require('../db/connection'); // Make sure this points to your PostgreSQL connection

// Get all classifications
exports.getClassifications = async () => {
  try {
    const sql = 'SELECT * FROM classification ORDER BY classification_name';
    const result = await pool.query(sql);
    return result;
  } catch (error) {
    console.error('Error fetching classifications:', error);
    throw error;
  }
};

// Insert a new classification
exports.insertClassification = async (classification_name) => {
  try {
    const sql = 'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *';
    const values = [classification_name];
    const result = await pool.query(sql, values);
    return result.rows[0]; // Return the inserted row
  } catch (error) {
    console.error('Error inserting classification:', error);
    throw error;
  }
};

// Insert a new vehicle
exports.insertVehicle = async ({ inv_make, inv_model, inv_year, classification_id }) => {
  try {
    const sql = `
      INSERT INTO inventory (inv_make, inv_model, inv_year, classification_id)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [inv_make, inv_model, inv_year, classification_id];
    const result = await pool.query(sql, values);
    return result.rows[0]; // Return the inserted vehicle
  } catch (error) {
    console.error('Error inserting vehicle:', error);
    throw error;
  }
};