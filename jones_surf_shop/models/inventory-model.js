const pool = require("../database/connection")

// Get a single vehicle by id using parameterized query
exports.getVehicleById = async (id) => {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1"
    const result = await pool.query(sql, [id])
    return result.rows[0]
  } catch (err) {
    throw new Error("Database query failed: " + err.message)
  }
}
