import pool from "../database/pool.js";

// Get vehicle data by inventory id
export const getVehicleById = async (inv_id) => {
  const query = "SELECT * FROM inventory WHERE inv_id = $1";
  const values = [inv_id];

  const result = await pool.query(query, values);
  return result.rows[0]; // Return single vehicle
};