const pool = require("../database/")

/* ***************************
* Get vehicles by classification id
**************************** */
async function getInventoryByClassificationId(classification_id) {
  const sql = `
    SELECT * FROM inventory
    WHERE classification_id = $1
  `
  const data = await pool.query(sql, [classification_id])
  return data.rows
}

/* ***************************
* Get single vehicle by ID
**************************** */
async function getVehicleById(inv_id) {
  const sql = `
    SELECT * FROM inventory
    WHERE inv_id = $1
  `
  const data = await pool.query(sql, [inv_id])
  return data.rows[0]
}

module.exports = {
  getInventoryByClassificationId,
  getVehicleById,
}