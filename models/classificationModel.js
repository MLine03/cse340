// models/classificationModel.js

import pool from "./db.js";

const classificationModel = {};

// Get all classifications
classificationModel.getClassifications = async () => {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Add new classification
classificationModel.addClassification = async (classification_name) => {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING classification_id
    `;
    const result = await pool.query(sql, [classification_name]);
    return result.rowCount;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default classificationModel; // ✅ THIS FIXES YOUR ERROR