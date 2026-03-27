// inventory-model.js
import pool from '../db.js';

// Get all classifications
export async function getClassifications() {
  const sql = `SELECT * FROM classifications ORDER BY name`;
  const result = await pool.query(sql);
  return result.rows;
}

// Add a new vehicle
export async function addVehicle(vehicle) {
  const sql = `
    INSERT INTO inventory (make, model, year, price, classification_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [
    vehicle.make,
    vehicle.model,
    vehicle.year,
    vehicle.price,
    vehicle.classification_id
  ];
  const result = await pool.query(sql, values);
  return result.rows[0];
}

// Get vehicle by ID
export async function getVehicleById(id) {
  const sql = `
    SELECT i.*, c.name AS classification_name
    FROM inventory i
    JOIN classifications c ON i.classification_id = c.id
    WHERE i.id = $1`;
  const result = await pool.query(sql, [id]);
  return result.rows[0];
}