// models/classification-model.js
const pool = require("../database/db"); // use current db.js

// Get all classifications
async function getClassifications() {
  try {
    const sql = `SELECT * FROM carclassification ORDER BY classification_name`;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getClassifications error:", error);
    return [];
  }
}

// Get a single classification by ID
async function getClassificationById(classification_id) {
  try {
    const sql = `SELECT * FROM carclassification WHERE classification_id = $1`;
    const result = await pool.query(sql, [classification_id]);
    return result.rows[0];
  } catch (error) {
    console.error("getClassificationById error:", error);
    return null;
  }
}

module.exports = { getClassifications, getClassificationById };