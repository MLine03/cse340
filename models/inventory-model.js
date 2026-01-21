// models/inventory-model.js
const pool = require("../database")

/* ***************************
 *  Get all classifications
 * ************************** */
async function getClassifications() {
  try {
    const data = await pool.query("SELECT * FROM public.classification")
    return data.rows
  } catch (error) {
    console.error("getClassifications error:", error)
    return []
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
       JOIN public.classification AS c
       ON i.classification_id = c.classification_id
       WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error)
    return []
  }
}

module.exports = { getClassifications, getInventoryByClassificationId }
