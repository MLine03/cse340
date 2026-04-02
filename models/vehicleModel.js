// models/vehicleModel.js
import pool from "../database/connection.js";

export async function getVehicles() {
  const sql = "SELECT * FROM vehicles";
  const result = await pool.query(sql);
  return result.rows;
}