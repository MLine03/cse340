const pool = require('../database/connection');

async function getAccountById(account_id) {
  const sql = `SELECT * FROM account WHERE account_id = $1`;
  const result = await pool.query(sql, [account_id]);
  return result.rows[0];
}

async function validateAccountUpdate(account_id, email) {
  const sql = `SELECT * FROM account WHERE email = $1 AND account_id <> $2`;
  const result = await pool.query(sql, [email, account_id]);
  return result.rows.length > 0 ? ['Email already exists'] : [];
}

async function updateAccount(account_id, first_name, last_name, email) {
  const sql = `UPDATE account SET first_name=$1, last_name=$2, email=$3 WHERE account_id=$4`;
  await pool.query(sql, [first_name, last_name, email, account_id]);
}

async function updatePassword(account_id, hashed) {
  const sql = `UPDATE account SET password=$1 WHERE account_id=$2`;
  await pool.query(sql, [hashed, account_id]);
}

module.exports = { getAccountById, validateAccountUpdate, updateAccount, updatePassword };