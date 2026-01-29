const pool = require("../database/connection");

// Register a new account
async function registerAccount({ account_firstname, account_lastname, account_email, account_password, account_type = "client" }) {
  const sql = `INSERT INTO account 
               (account_firstname, account_lastname, account_email, account_password, account_type)
               VALUES ($1,$2,$3,$4,$5)`;
  return pool.query(sql, [account_firstname, account_lastname, account_email, account_password, account_type]);
}

// Check if email already exists
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const result = await pool.query(sql, [account_email]);
    return result.rowCount;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  registerAccount,
  checkExistingEmail,
};
