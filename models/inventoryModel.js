import { pool } from '../utils/db-connection.js';

// Get all inventory
export const getAllInventory = async () => {
  const res = await pool.query('SELECT * FROM inventory');
  return res.rows;
};

// Add inventory
export const addInventory = async ({ name, price, quantity }) => {
  const res = await pool.query(
    'INSERT INTO inventory (name, price, quantity) VALUES ($1, $2, $3) RETURNING id',
    [name, price, quantity]
  );
  return res.rows[0].id;
};

// Update inventory
export const updateInventory = async (id, { name, price, quantity }) => {
  await pool.query(
    'UPDATE inventory SET name=$1, price=$2, quantity=$3 WHERE id=$4',
    [name, price, quantity, id]
  );
};

// Delete inventory
export const deleteInventory = async (id) => {
  await pool.query('DELETE FROM inventory WHERE id=$1', [id]);
};