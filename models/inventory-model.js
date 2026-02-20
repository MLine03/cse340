const pool = require("../db")  // points to db/index.js

async function getInventoryById(inv_id) {
  try {
    const sql = `
      SELECT * 
      FROM inventory AS i
      JOIN classification AS c
      ON i.classification_id = c.classification_id
      WHERE inv_id = $1
    `
    const result = await pool.query(sql, [inv_id])
    return result.rows[0] || null
  } catch (error) {
    console.error("Database error: ", error)
    throw error
  }
}

module.exports = { getInventoryById }