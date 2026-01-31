const pool = require("../database")

async function getVehiclesByClassification(typeId) {
  const sql = "SELECT * FROM inventory WHERE classification_id = $1"
  const values = [typeId]
  const result = await pool.query(sql, values)
  return result.rows
}

async function getVehicleById(invId) {
  const sql = "SELECT * FROM inventory WHERE inv_id = $1"
  const values = [invId]
  const result = await pool.query(sql, values)
  return result.rows[0]
}

module.exports = { getVehiclesByClassification, getVehicleById }
