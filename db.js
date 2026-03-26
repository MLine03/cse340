const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/vehicle_inventory',
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};