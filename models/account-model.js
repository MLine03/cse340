const Pool = require("pg").Pool;
const pool = new Pool({
  user: "mac",
  host: "localhost",
  database: "cse340",
  password: "",
  port: 5432,
});

// Register new account
async function registerAccount(firstname, lastname, email, password) {
  try {
    const sql = `INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
                 VALUES ($1, $2, $3, $4, 'client') RETURNING *`;
    const result = await pool.query(sql, [firstname, lastname, email, password]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount; // 0 = not found, >0 = exists
  } catch (error) {
    return error.message;
  }
}

module.exports = { registerAccount, checkExistingEmail };
