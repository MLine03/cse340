import pool from "../database/connection.js";

export async function getClassifications() {
  const sql = "SELECT * FROM classifications";
  const result = await pool.query(sql);
  return result.rows;
}