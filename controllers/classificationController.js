// models/classificationModel.js
import pool from "../database/connection.js";

export async function getClassifications() {
  const sql = "SELECT * FROM carclassification ORDER BY classification_name";
  const result = await pool.query(sql);
  return result.rows;
}