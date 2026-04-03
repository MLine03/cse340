import pool from "../database/pool.js";

export async function fetchVehicleById(inv_id) {
  const sql = "SELECT * FROM inventory WHERE inv_id = $1";
  const result = await pool.query(sql, [inv_id]);
  return result.rows[0];
}