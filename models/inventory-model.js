const pool = require("../database")

async function getInventoryByClassification(classificationId) {
  const sql = "SELECT * FROM public.inventory WHERE classification_id=$1"
  const result = await pool.query(sql, [classificationId])
  return result.rows
}

async function getVehicleById(invId) {
  const sql = "SELECT * FROM public.inventory WHERE inv_id=$1"
  const result = await pool.query(sql, [invId])
  return result.rows[0]
}

module.exports = { getInventoryByClassification, getVehicleById }