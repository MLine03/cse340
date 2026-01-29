const pool = require("../database/connection"); // Make sure this file exists

// Register a new account
async function registerAccount({
  account_firstname,
  account_lastname,
  account_email,
  account_password,
  account_type = "client",
}) {
  const sql = `INSERT INTO account 
               (account_firstname, account_lastname, account_email, account_password, account_type)
               VALUES ($1, $2, $3, $4, $5)`;
  return pool.query(sql, [
    account_firstname,
    account_lastname,
    account_email,
    account_password,
    account_type,
  ]);
}

// Check for existing email
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
}

module.exports = { registerAccount, checkExistingEmail };
