// utils/db-connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const query = async (sql, params) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

// Example helper functions
export const getAccountByEmail = async (email) => {
  const rows = await query('SELECT * FROM accounts WHERE email = ?', [email]);
  return rows[0];
};

export const createAccount = async ({ firstname, lastname, email, password }) => {
  const result = await query(
    'INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
    [firstname, lastname, email, password]
  );
  return result.insertId;
};