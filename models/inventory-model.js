// models/inventory-model.js
const pool = require("../database/db"); // use current db.js

// Get all vehicles
async function getAllVehicles() {
  try {
    const sql = `SELECT * FROM inventory ORDER BY inv_make, inv_model`;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getAllVehicles error:", error);
    return [];
  }
}

// Get vehicles by classification
async function getVehiclesByClassification(classification_id) {
  try {
    const sql = `SELECT * FROM inventory WHERE classification_id = $1 ORDER BY inv_make, inv_model`;
    const result = await pool.query(sql, [classification_id]);
    return result.rows;
  } catch (error) {
    console.error("getVehiclesByClassification error:", error);
    return [];
  }
}

// Get single vehicle by ID
async function getVehicleById(inv_id) {
  try {
    const sql = `SELECT * FROM inventory WHERE inv_id = $1`;
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (error) {
    console.error("getVehicleById error:", error);
    return null;
  }
}

module.exports = { getAllVehicles, getVehiclesByClassification, getVehicleById };