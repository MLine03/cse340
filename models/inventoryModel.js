// /models/inventoryModel.js
import pool from "../database/connection.js";

// Get all inventory items
export async function getInventory() {
  const sql = "SELECT * FROM inventory";
  const result = await pool.query(sql);
  return result.rows;
}

// Add a new inventory item
export async function addInventory({ inv_make, inv_model, inv_year, inv_price }) {
  const sql =
    "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(sql, [inv_make, inv_model, inv_year, inv_price]);
  return result.rows[0];
}

// Update an inventory item
export async function updateInventory({ inv_id, inv_make, inv_model, inv_year, inv_price }) {
  const sql =
    "UPDATE inventory SET inv_make = $1, inv_model = $2, inv_year = $3, inv_price = $4 WHERE inv_id = $5 RETURNING *";
  const result = await pool.query(sql, [inv_make, inv_model, inv_year, inv_price, inv_id]);
  return result.rows[0];
}

// Delete an inventory item
export async function deleteInventory(inv_id) {
  const sql = "DELETE FROM inventory WHERE inv_id = $1";
  await pool.query(sql, [inv_id]);
  return true;
}