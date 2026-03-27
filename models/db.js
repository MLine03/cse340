// models/db.js
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

// Create a PostgreSQL connection pool
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Required for Render.com Postgres
  },
});

// Optional: test connection
pool.connect()
  .then(() => console.log('Postgres connected successfully'))
  .catch(err => console.error('Postgres connection error', err));