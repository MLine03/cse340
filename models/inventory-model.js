const pool = require("../database/index")

async function getVehiclesByClassification(classificationId) {
  const sql = "SELECT * FROM inventory WHERE classification_id = $1"
  const values = [classificationId]
  const result = await pool.query(sql, values)
  return result.rows
}

async function getVehicleById(invId) {
  const sql = "SELECT * FROM inventory WHERE inv_id = $1"
  const values = [invId]
  const result = await pool.query(sql, values)
  return result.rows[0]
}

async function getClassifications() {
  const sql = "SELECT * FROM car_classifications ORDER BY classification_name"
  const result = await pool.query(sql)
  return result.rows
}

module.exports = { getVehiclesByClassification, getVehicleById, getClassifications }
