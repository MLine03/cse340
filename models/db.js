const { Pool } = require('pg');

const pool = new Pool({
    user: 'macuser',
    host: 'localhost',
    database: 'cse340db',
    password: '',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
