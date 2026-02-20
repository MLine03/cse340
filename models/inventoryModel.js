import { query } from '../utils/db-connection.js';

export const getAllInventory = async () => {
  return query('SELECT * FROM inventory');
};

export const addInventory = async (item) => {
  const { name, quantity, price } = item;
  return query('INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)', [name, quantity, price]);
};

export const updateInventory = async (id, item) => {
  const { name, quantity, price } = item;
  return query('UPDATE inventory SET name = ?, quantity = ?, price = ? WHERE id = ?', [name, quantity, price, id]);
};

export const deleteInventory = async (id) => {
  return query('DELETE FROM inventory WHERE id = ?', [id]);
};