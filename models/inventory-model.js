const pool = require("../database/")

async function getInventoryById(inv_id) {
  try {
    const sql = `
      SELECT * 
      FROM inventory AS i
      JOIN classification AS c
      ON i.classification_id = c.classification_id
      WHERE inv_id = $1
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryById error: " + error)
    throw error
  }
}

module.exports = { getInventoryById }