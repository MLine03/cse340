import pool from "../database/pool.js";

export const getVehicleById = async (vehicle_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM inventory WHERE inventory_id = ?",
    [vehicle_id]
  );
  return rows[0];
};