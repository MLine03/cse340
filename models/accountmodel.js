const pool = require('../db/connection');

async function getAccountById(account_id) {
    const [rows] = await pool.query(
        'SELECT * FROM accounts WHERE account_id = ?',
        [account_id]
    );
    return rows[0];
}

async function getAccountByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM accounts WHERE email = ?',
        [email]
    );
    return rows[0];
}

async function updateAccount(account_id, firstname, lastname, email) {
    await pool.query(
        'UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?',
        [firstname, lastname, email, account_id]
    );
}

async function updatePassword(account_id, password) {
    await pool.query(
        'UPDATE accounts SET password = ? WHERE account_id = ?',
        [password, account_id]
    );
}

module.exports = { getAccountById, getAccountByEmail, updateAccount, updatePassword };