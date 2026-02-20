// models/inventoryModel.js
import { pool } from '../utils/db-connection.js';

export const getAllInventory = async () => {
  const res = await pool.query('SELECT * FROM inventory');
  return res.rows;
};

export const addInventory = async ({ name, quantity, price }) => {
  const res = await pool.query(
    'INSERT INTO inventory (name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
    [name, quantity, price]
  );
  return res.rows[0];
};

export const updateInventory = async (id, { name, quantity, price }) => {
  await pool.query(
    'UPDATE inventory SET name=$1, quantity=$2, price=$3 WHERE inventory_id=$4',
    [name, quantity, price, id]
  );
};

export const deleteInventory = async (id) => {
  await pool.query('DELETE FROM inventory WHERE inventory_id=$1', [id]);
};