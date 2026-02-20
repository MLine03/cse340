// models/inventoryModel.js
import { query } from '../utils/db-connection.js';

export const getAllInventory = async () => query('SELECT * FROM inventory');

export const addInventory = async ({ name, quantity, price }) =>
  query('INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)', [name, quantity, price]);

export const updateInventory = async (id, { name, quantity, price }) =>
  query('UPDATE inventory SET name = ?, quantity = ?, price = ? WHERE id = ?', [name, quantity, price, id]);

export const deleteInventory = async (id) =>
  query('DELETE FROM inventory WHERE id = ?', [id]);