import pool from '../db.js';
import bcrypt from 'bcryptjs';

// Get account by ID
export async function getAccountById(account_id) {
  const sql = 'SELECT account_id, firstname, lastname, email, account_type FROM accounts WHERE account_id=$1';
  const result = await pool.query(sql, [account_id]);
  return result.rows[0];
}

// Update account info
export async function updateAccount(account_id, firstname, lastname, email) {
  const sql = 'UPDATE accounts SET firstname=$1, lastname=$2, email=$3 WHERE account_id=$4 RETURNING *';
  const result = await pool.query(sql, [firstname, lastname, email, account_id]);
  return result.rows[0];
}

// Update password (hashed)
export async function updatePassword(account_id, password) {
  const hash = await bcrypt.hash(password, 10);
  const sql = 'UPDATE accounts SET password=$1 WHERE account_id=$2';
  await pool.query(sql, [hash, account_id]);
}