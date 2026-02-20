// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

pool.on('connect', () => {
  console.log('Database connected successfully');
});

export default pool;