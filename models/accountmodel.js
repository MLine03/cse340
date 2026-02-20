// models/accountsModel.js
const pool = require('../db/connection'); // Your MySQL pool or database connection

exports.getAccountByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM accounts WHERE email = ?', [email]);
    return rows[0];
};

exports.getAccountById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM accounts WHERE account_id = ?', [id]);
    return rows[0];
};

exports.updateAccount = async ({ account_id, firstname, lastname, email }) => {
    await pool.query(
        'UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?',
        [firstname, lastname, email, account_id]
    );
};

exports.updatePassword = async (account_id, hashedPassword) => {
    await pool.query('UPDATE accounts SET password = ? WHERE account_id = ?', [hashedPassword, account_id]);
};