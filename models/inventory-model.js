const pool = require("../database")

/* ***************************
 * Get all classifications
 * ************************** */
async function getClassifications() {
  const sql = `
    SELECT * 
    FROM classification 
    ORDER BY classification_name
  `
  const data = await pool.query(sql)
  return data
}

module.exports = { getClassifications }