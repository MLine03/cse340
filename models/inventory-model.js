const pool = require("../database/")

/* *****************************
 *  Get inventory by classification id
 * ***************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory
       WHERE classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    throw error
  }
}

/* *****************************
 *  Get inventory item by inventory id
 * ***************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory
       WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    throw error
  }
}

module.exports = {
  getInventoryByClassificationId,
  getInventoryById
}
