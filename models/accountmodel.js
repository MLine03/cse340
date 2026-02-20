// models/accountModel.js
import { query } from '../utils/db-connection.js';

export const getAccountById = async (id) => {
  const rows = await query('SELECT * FROM accounts WHERE account_id = ?', [id]);
  return rows[0];
};

export const getAccountByEmail = async (email) => {
  const rows = await query('SELECT * FROM accounts WHERE email = ?', [email]);
  return rows[0];
};

export const updateAccount = async (id, firstname, lastname, email) => {
  return query(
    'UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?',
    [firstname, lastname, email, id]
  );
};

export const updatePassword = async (id, hashedPassword) => {
  return query(
    'UPDATE accounts SET password = ? WHERE account_id = ?',
    [hashedPassword, id]
  );
};