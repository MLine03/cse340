// models/accountsModel.js
import pool from "../database/pool.js";

// Get account by ID
export const getAccountById = async (account_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM accounts WHERE account_id = ?",
    [account_id]
  );
  return rows[0];
};

// Update account info
export const updateAccount = async ({ account_id, firstname, lastname, email }) => {
  const [result] = await pool.query(
    "UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?",
    [firstname, lastname, email, account_id]
  );
  return result.affectedRows > 0;
};

// Update password
export const updatePassword = async (account_id, hashedPassword) => {
  const [result] = await pool.query(
    "UPDATE accounts SET password = ? WHERE account_id = ?",
    [hashedPassword, account_id]
  );
  return result.affectedRows > 0;
};

// Get account by email (for login)
export const getAccountByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM accounts WHERE email = ?",
    [email]
  );
  return rows[0];
};