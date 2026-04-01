import pool from "./db.js";

const InventoryModel = {
  getByClassification: async (classification_id) => {
    const sql = "SELECT * FROM inventory WHERE classification_id=$1";
    const result = await pool.query(sql, [classification_id]);
    return result.rows;
  },

  getVehicleById: async (inventory_id) => {
    const sql = "SELECT * FROM inventory WHERE inventory_id=$1";
    const result = await pool.query(sql, [inventory_id]);
    return result.rows[0];
  }
};

export default InventoryModel;