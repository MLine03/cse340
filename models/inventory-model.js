const pool = require("../database/")

async function getVehicleById(inv_id) {
  const sql = "SELECT * FROM inventory WHERE inv_id = $1"
  const data = await pool.query(sql, [inv_id])
  return data.rows[0]
}

module.exports = { getVehicleById }