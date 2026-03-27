// models/vehicleModel.js
import { pool } from './db.js';

// Get all vehicle classifications
export async function getClassifications() {
  const sql = 'SELECT * FROM classifications ORDER BY classification_name ASC';
  const result = await pool.query(sql);
  return result.rows;
}

// Get all vehicles for a specific classification
export async function getVehiclesByClassification(classificationId) {
  const sql = 'SELECT * FROM inventory WHERE classification_id = $1 ORDER BY make ASC';
  const result = await pool.query(sql, [classificationId]);
  return result.rows;
}

// Get a single vehicle by ID
export async function getVehicleById(vehicleId) {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
  const result = await pool.query(sql, [vehicleId]);
  return result.rows[0];
}

// Add more queries as needed (insert/update/delete)