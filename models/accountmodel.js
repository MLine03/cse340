// models/accountModel.js
import { pool } from '../utils/db-connection.js';

// Get account by email
export const getAccountByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM accounts WHERE email = ?', [email]);
  return rows[0];
};

// Get account by ID
export const getAccountById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM accounts WHERE account_id = ?', [id]);
  return rows[0];
};

// Create account
export const createAccount = async ({ firstname, lastname, email, password }) => {
  const [result] = await pool.query(
    'INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
    [firstname, lastname, email, password]
  );
  return result.insertId;
};

// Update account info
export const updateAccount = async (id, firstname, lastname, email) => {
  await pool.query(
    'UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?',
    [firstname, lastname, email, id]
  );
};

// Update password
export const updatePassword = async (id, password) => {
  await pool.query('UPDATE accounts SET password = ? WHERE account_id = ?', [password, id]);
};