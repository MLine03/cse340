const pool = require("../database"); // your PostgreSQL connection

// Check if email already exists
exports.checkExistingEmail = async (email) => {
  try {
    const sql = "SELECT account_email FROM accounts WHERE account_email = $1";
    const result = await pool.query(sql, [email]);
    return result.rows.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Register new account
exports.registerAccount = async (firstname, lastname, email, password) => {
  try {
    const sql = `INSERT INTO accounts (account_firstname, account_lastname, account_email, account_password)
                 VALUES ($1, $2, $3, $4) RETURNING account_id`;
    const result = await pool.query(sql, [firstname, lastname, email, password]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
