const pool = require("../database");

// Get inventory item by ID
async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0]; // single item
  } catch (error) {
    throw new Error("Get Inventory By ID Error");
  }
}

// Delete inventory item
async function deleteInventoryItem(inv_id) {
  try {
    const sql = "DELETE FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rowCount; // 1 if deleted, 0 if failed
  } catch (error) {
    throw new Error("Delete Inventory Error");
  }
}

module.exports = {
  getInventoryById,
  deleteInventoryItem
};
