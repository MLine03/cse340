import pool from "../database/pool.js";

export async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}