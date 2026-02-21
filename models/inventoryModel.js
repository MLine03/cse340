// models/inventoryModel.js
import { pool } from '../utils/db-connection.js';

// Get all inventory
export const getAllInventory = async () => {
  const sql = 'SELECT * FROM inventory ORDER BY id';
  const result = await pool.query(sql);
  return result.rows;
};

// Add a new inventory item
export const addInventoryItem = async (item) => {
  const { name, type, price } = item;
  const sql = 'INSERT INTO inventory (name, type, price) VALUES ($1, $2, $3) RETURNING *';
  const result = await pool.query(sql, [name, type, price]);
  return result.rows[0];
};

// Delete an inventory item by ID
export const deleteInventoryItem = async (id) => {
  const sql = 'DELETE FROM inventory WHERE id = $1 RETURNING *';
  const result = await pool.query(sql, [id]);
  return result.rows[0];
};