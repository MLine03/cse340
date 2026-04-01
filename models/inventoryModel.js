import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Get inventory by classification
export const getInventoryByClassification = async (classificationId) => {
  const sql = 'SELECT * FROM inventory WHERE classification_id=$1 ORDER BY make, model';
  const result = await pool.query(sql, [classificationId]);
  return result.rows;
};

// Get inventory by id
export const getInventoryById = async (inventoryId) => {
  const sql = 'SELECT * FROM inventory WHERE inventory_id=$1';
  const result = await pool.query(sql, [inventoryId]);
  return result.rows[0];
};