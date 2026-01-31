const pool = require("../database/")

async function getInventoryByClassificationId(classification_id) {
  const data = await pool.query(
    `SELECT * FROM inventory
     WHERE classification_id = $1`,
    [classification_id]
  )
  return data.rows
}

async function getInventoryById(inv_id) {
  const data = await pool.query(
    `SELECT * FROM inventory
     WHERE inv_id = $1`,
    [inv_id]
  )
  return data.rows[0]
}

module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
}
