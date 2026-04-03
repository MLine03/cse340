const pool = require("../database/")

/* ***************************
 * Get all classifications
 * ************************** */
async function getClassifications() {
  const sql = "SELECT * FROM classification ORDER BY classification_name"
  const data = await pool.query(sql)
  return data.rows
}

/* ***************************
 * Get inventory by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  const sql = `
    SELECT * FROM inventory AS i
    JOIN classification AS c
    ON i.classification_id = c.classification_id
    WHERE i.classification_id = $1
  `
  const data = await pool.query(sql, [classification_id])
  return data.rows
}

/* ***************************
 * Get vehicle by inventory_id
 * ************************** */
async function getInventoryById(inv_id) {
  const sql = `
    SELECT * FROM inventory AS i
    JOIN classification AS c
    ON i.classification_id = c.classification_id
    WHERE i.inv_id = $1
  `
  const data = await pool.query(sql, [inv_id])
  return data.rows[0]
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById
}