// models/accountModel.js
import pool from "../database/connection.js";

export async function checkExistingEmail(email) {
  const sql = "SELECT account_id FROM accounts WHERE account_email = $1";
  const result = await pool.query(sql, [email]);
  return result.rowCount > 0;
}

export async function registerAccount({ account_firstname, account_lastname, account_email, account_password }) {
  const sql =
    "INSERT INTO accounts (account_firstname, account_lastname, account_email, account_password) VALUES ($1,$2,$3,$4) RETURNING account_id";
  const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_password]);
  return result.rows[0];
}