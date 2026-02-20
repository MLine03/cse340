// models/inventoryModel.js
import { pool } from '../utils/db-connection.js';

export const getAllInventory = async () => {
  const result = await pool.query('SELECT * FROM inventory');
  return result.rows;
};

export const addInventory = async ({ name, description, price, quantity }) => {
  const result = await pool.query(
    'INSERT INTO inventory (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, quantity]
  );
  return result.rows[0];
};

export const updateInventory = async (id, { name, description, price, quantity }) => {
  await pool.query(
    'UPDATE inventory SET name=$1, description=$2, price=$3, quantity=$4 WHERE inventory_id=$5',
    [name, description, price, quantity, id]
  );
};

export const deleteInventory = async (id) => {
  await pool.query('DELETE FROM inventory WHERE inventory_id=$1', [id]);
};