// database/connection.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'mac',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'cse340',
  port: 5432,
});

module.exports = pool;