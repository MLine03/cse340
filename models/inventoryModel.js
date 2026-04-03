// models/inventoryModel.js
import pool from "../database/pool.js";

/**
 * Get a single vehicle by its inventory ID
 * @param {number} inv_id - The inventory ID
 * @returns {object|null} - Vehicle object or null if not found
 */
export async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
}

/**
 * Get all vehicles (optional, for inventory listing)
 * @returns {Array} - List of vehicles
 */
export async function getAllVehicles() {
  try {
    const sql = "SELECT * FROM inventory ORDER BY inv_id";
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
}