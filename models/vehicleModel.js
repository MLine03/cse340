// models/vehicleModel.js
import { pool } from './db.js';

// Get all classifications
export async function getClassifications() {
  const sql = 'SELECT * FROM classification ORDER BY classification_name ASC';
  const result = await pool.query(sql);
  return result.rows;
}

// Get all vehicles
export async function getAllVehicles() {
  const sql = 'SELECT * FROM inventory ORDER BY inv_make ASC';
  const result = await pool.query(sql);
  return result.rows;
}

// Get vehicles by classification
export async function getVehiclesByClassification(classification_id) {
  const sql = 'SELECT * FROM inventory WHERE classification_id = $1 ORDER BY inv_make ASC';
  const result = await pool.query(sql, [classification_id]);
  return result.rows;
}

// Get a single vehicle by ID
export async function getVehicleById(inv_id) {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
  const result = await pool.query(sql, [inv_id]);
  return result.rows[0];
}