// models/accountModel.js
import { pool } from '../utils/db-connection.js';

// Get account by email
export const getAccountByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
  return res.rows[0];
};

// Get account by ID
export const getAccountById = async (id) => {
  const res = await pool.query('SELECT * FROM accounts WHERE account_id = $1', [id]);
  return res.rows[0];
};

// Create account
export const createAccount = async ({ firstname, lastname, email, password }) => {
  const res = await pool.query(
    'INSERT INTO accounts (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING account_id',
    [firstname, lastname, email, password]
  );
  return res.rows[0].account_id;
};

// Update account info
export const updateAccount = async (id, firstname, lastname, email) => {
  await pool.query(
    'UPDATE accounts SET firstname=$1, lastname=$2, email=$3 WHERE account_id=$4',
    [firstname, lastname, email, id]
  );
};

// Update password
export const updatePassword = async (id, password) => {
  await pool.query('UPDATE accounts SET password=$1 WHERE account_id=$2', [password, id]);
};