const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }, // Required for Render
});

pool.connect()
  .then(() => console.log('✅ PostgreSQL connected successfully!'))
  .catch(err => console.error('❌ Database connection failed:', err));

module.exports = pool;