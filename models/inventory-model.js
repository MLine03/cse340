const pool = require("../database/")

async function getVehicleById(inv_id) {
  const sql = `
    SELECT * FROM inventory
    JOIN classification
    ON inventory.classification_id = classification.classification_id
    WHERE inv_id = $1
  `
  const data = await pool.query(sql, [inv_id])
  return data.rows[0]
}

async function getInventoryByClassification(classification_id) {
  const sql = `
    SELECT * FROM inventory
    WHERE classification_id = $1
  `
  const data = await pool.query(sql, [classification_id])
  return data.rows
}

module.exports = {
  getVehicleById,
  getInventoryByClassification,
}
