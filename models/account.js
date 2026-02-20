// models/account.js
const pool = require('../db/pool'); // ✅ updated path

module.exports = {
    getAllAccounts: async () => {
        const result = await pool.query('SELECT * FROM account ORDER BY account_id');
        return result.rows;
    },
    getAccountById: async (id) => {
        const result = await pool.query('SELECT * FROM account WHERE account_id = $1', [id]);
        return result.rows[0];
    }
};