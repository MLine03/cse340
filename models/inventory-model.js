import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function getVehicleById(inv_id) {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
  const values = [inv_id];
  try {
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}