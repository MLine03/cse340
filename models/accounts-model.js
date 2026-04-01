import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function updateAccountData(userId, name, email, password) {
  const hashed = await bcrypt.hash(password, 10);
  const sql = 'UPDATE account SET name=$1, email=$2, password=$3 WHERE account_id=$4';
  const values = [name, email, hashed, userId];
  await pool.query(sql, values);
}