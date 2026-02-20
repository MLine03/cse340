const pool = require('../db')

// Get vehicle by inventory ID
async function getInventoryById(inv_id) {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1'
  const values = [inv_id]
  const result = await pool.query(sql, values)
  return result.rows[0]
}

module.exports = { getInventoryById }