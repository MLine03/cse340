import pool from "../database/pool.js";

export const getVehicleById = async (vehicleId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE inventory_id = $1",
      [vehicleId]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Query Error:", err);
    throw err;
  }
};