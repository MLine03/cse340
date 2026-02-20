// utils/db-connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Named exports for all DB operations
export const getAccountByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM accounts WHERE email = ?', [email]);
  return rows[0];
};

export const createAccount = async (firstname, lastname, email, password) => {
  const [result] = await pool.query(
    'INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
    [firstname, lastname, email, password]
  );
  return result;
};

export const getAccountById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM accounts WHERE account_id = ?', [id]);
  return rows[0];
};

export const updateAccount = async (id, firstname, lastname, email) => {
  await pool.query(
    'UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?',
    [firstname, lastname, email, id]
  );
};

export const updatePassword = async (id, password) => {
  await pool.query('UPDATE accounts SET password = ? WHERE account_id = ?', [password, id]);
};