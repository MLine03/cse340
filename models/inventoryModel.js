import pool from "../database/pool.js";

export async function fetchAllVehicles() {
  const result = await pool.query("SELECT * FROM inventory ORDER BY inv_id");
  return result.rows;
}

export async function fetchVehicleById(inv_id) {
  const result = await pool.query("SELECT * FROM inventory WHERE inv_id = $1", [inv_id]);
  return result.rows[0];
}