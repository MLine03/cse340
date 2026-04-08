const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  ).then(result => result.rows)
}

/* ***************************
 *  Get all inventory items by classification_id
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
    console.error("getInventoryByClassificationId error: " + error)
    return []
  }
}

/* ***************************
 *  Get single inventory item by inv_id
 * ************************** */
async function getInventoryById(invId) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
       JOIN public.classification AS c
       ON i.classification_id = c.classification_id
       WHERE i.inv_id = $1`,
      [invId]
    )
    return data.rows[0] || null
  } catch (error) {
    console.error("getInventoryById error: " + error)
    return null
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById
}