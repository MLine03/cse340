// models/inventory-model.js
import pool from "./db.js";

export async function addInventory(data) {
  const { inv_make, inv_model, inv_year, classification_id } = data;
  const sql = `INSERT INTO inventory (inv_make, inv_model, inv_year, classification_id)
               VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [inv_make, inv_model, inv_year, classification_id];

  const result = await pool.query(sql, values);
  return result;
}

export default { addInventory };