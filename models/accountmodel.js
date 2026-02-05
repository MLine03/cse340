// models/accountModel.js
const pool = require("../database/connection"); // Your DB connection module
const bcrypt = require("bcryptjs");

// Update account info
async function updateAccount(account_id, firstname, lastname, email) {
  const sql = `UPDATE accounts SET account_firstname = ?, account_lastname = ?, account_email = ? WHERE account_id = ?`;
  const params = [firstname, lastname, email, account_id];
  const [result] = await pool.execute(sql, params);
  return result;
}

// Update password
async function updatePassword(account_id, password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  const sql = `UPDATE accounts SET account_password = ? WHERE account_id = ?`;
  const params = [hashedPassword, account_id];
  const [result] = await pool.execute(sql, params);
  return result;
}

// Get account by email
async function getAccountByEmail(email) {
  const sql = `SELECT * FROM accounts WHERE account_email = ?`;
  const [rows] = await pool.execute(sql, [email]);
  return rows[0];
}

module.exports = {
  updateAccount,
  updatePassword,
  getAccountByEmail,
};
