import pool from "../database/connection.js";

export async function getClassifications() {
  const sql = "SELECT * FROM car_classification";
  const result = await pool.query(sql);
  return result.rows;
}