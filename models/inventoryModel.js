// models/inventoryModel.js
import { query } from '../utils/db-connection.js';

// Get all inventory items
export const getInventory = async () => {
  const [rows] = await query('SELECT * FROM inventory');
  return rows;
};

// Add inventory item
export const addInventory = async ({ name, description, price, quantity }) => {
  const [result] = await query(
    'INSERT INTO inventory (name, description, price, quantity) VALUES (?, ?, ?, ?)',
    [name, description, price, quantity]
  );
  return result.insertId;
};

// Delete inventory item
export const deleteInventory = async (id) => {
  await query('DELETE FROM inventory WHERE inventory_id = ?', [id]);
};