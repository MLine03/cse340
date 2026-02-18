const pool = require("../database/connection")

async function addClassification({ classification_name }) {
  try {
    const sql = "INSERT INTO classifications (classification_name) VALUES ($1) RETURNING *"
    const result = await pool.query(sql, [classification_name])
    return result.rows[0]
  } catch (error) {
    console.error(error)
    return null
  }
}

async function addInventory(invData) {
  try {
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = invData
    const sql = `INSERT INTO inventory
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`
    const values = [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color]
    const result = await pool.query(sql, values)
    return result.rows[0]
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getClassifications() {
  try {
    const sql = "SELECT * FROM classifications ORDER BY classification_name"
    const result = await pool.query(sql)
    return result.rows
  } catch (error) {
    console.error(error)
    return []
  }
}

module.exports = { addClassification, addInventory, getClassifications }
