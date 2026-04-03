import pool from "../database/pool.js";

export const getVehicleById = async (vehicleId) => {
  const result = await pool.query("SELECT * FROM inventory WHERE inventory_id = $1", [vehicleId]);
  return result.rows[0]; // PostgreSQL returns rows[]
};