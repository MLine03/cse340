const pool = require("../database/")

/* ***************************
 * Get all classifications
 *************************** */
async function getClassifications() {
  const data = await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  )
  return data
}

/* ***************************
 * Get inventory by classification id
 *************************** */
async function getInventoryByClassificationId(classification_id) {
  const sql = `
    SELECT * FROM inventory AS i
    JOIN classification AS c
    ON i.classification_id = c.classification_id
    WHERE i.classification_id = $1
  `
  return await pool.query(sql, [classification_id])
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
}