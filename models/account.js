const db = require('../database/db');

module.exports = {
    getAllAccounts: async () => {
        const result = await db.query('SELECT * FROM account ORDER BY account_id');
        return result.rows;
    },
    getAccountById: async (id) => {
        const result = await db.query('SELECT * FROM account WHERE account_id = $1', [id]);
        return result.rows[0];
    }
};
