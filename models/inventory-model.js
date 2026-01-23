const pool = require("../database") // your MySQL connection

async function getClassifications() {
  try {
    const sql = "SELECT * FROM car_classification ORDER BY classification_name"
    const [rows] = await pool.query(sql)
    return rows
  } catch (error) {
    console.error("Error fetching classifications:", error)
    return []
  }
}

async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = ?"
    const [rows] = await pool.query(sql, [inv_id])
    return rows[0] || null
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return null
  }
}

module.exports = {
  getClassifications,
  getVehicleById,
}

