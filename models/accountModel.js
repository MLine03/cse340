import pool from "../database/pool.js"; // MySQL connection pool

export const getAccountById = async (id) => {
  const [rows] = await pool.query(
    "SELECT account_id, firstname, lastname, email, account_type FROM accounts WHERE account_id = ?",
    [id]
  );
  return rows[0];
};

export const updateAccount = async ({ account_id, firstname, lastname, email }) => {
  const [result] = await pool.query(
    "UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?",
    [firstname, lastname, email, account_id]
  );
  return result.affectedRows > 0;
};

export const updatePassword = async (account_id, hashedPassword) => {
  const [result] = await pool.query(
    "UPDATE accounts SET password = ? WHERE account_id = ?",
    [hashedPassword, account_id]
  );
  return result.affectedRows > 0;
};