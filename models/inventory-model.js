const pool = require("../database/connection") // assumes you have a connection.js exporting a Pool

const invModel = {}

/* ADD CLASSIFICATION */
invModel.addClassification = async function (classification_name) {
  try {
    const sql = "INSERT INTO classifications (classification_name) VALUES ($1)"
    const result = await pool.query(sql, [classification_name])
    return result.rowCount > 0
  } catch (error) {
    console.error("Error adding classification:", error)
    return false
  }
}

/* ADD INVENTORY */
invModel.addInventory = async function (data) {
  try {
    const sql = `INSERT INTO inventory
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`

    const values = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description || "",
      data.inv_image || "/images/no-image.png",
      data.inv_thumbnail || "/images/no-image-tn.png",
      data.inv_price,
      data.inv_miles,
      data.inv_color,
    ]

    const result = await pool.query(sql, values)
    return result.rowCount > 0
  } catch (error) {
    console.error("Error adding inventory:", error)
    return false
  }
}

/* GET ALL CLASSIFICATIONS (for select list) */
invModel.getClassifications = async function () {
  try {
    const sql = "SELECT * FROM classifications ORDER BY classification_name ASC"
    const result = await pool.query(sql)
    return result
  } catch (error) {
    console.error("Error getting classifications:", error)
    return { rows: [] }
  }
}

module.exports = invModel
