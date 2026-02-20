// models/inventoryModel.js
import { pool } from '../utils/db-connection.js';

// Get all inventory items
export const getAllInventory = async () => {
  const [rows] = await pool.query('SELECT * FROM inventory');
  return rows;
};

// Get single inventory item by ID
export const getInventoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM inventory WHERE id = ?', [id]);
  return rows[0];
};

// Add new inventory item
export const addInventory = async ({ name, description, price, quantity }) => {
  const [result] = await pool.query(
    'INSERT INTO inventory (name, description, price, quantity) VALUES (?, ?, ?, ?)',
    [name, description, price, quantity]
  );
  return result.insertId;
};

// Update existing inventory item
export const updateInventory = async (id, { name, description, price, quantity }) => {
  await pool.query(
    'UPDATE inventory SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?',
    [name, description, price, quantity, id]
  );
};

// Delete inventory item
export const deleteInventory = async (id) => {
  await pool.query('DELETE FROM inventory WHERE id = ?', [id]);
};