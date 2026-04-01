// models/inventory-model.js
import pool from "../database/connection.js";

export async function addInventoryItem(itemData) {
  const sql = `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price, classification_id)
               VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const result = await pool.query(sql, [
    itemData.inv_make,
    itemData.inv_model,
    itemData.inv_year,
    itemData.inv_price,
    itemData.classification_id,
  ]);
  return result.rows[0];
}

export async function getClassifications() {
  const sql = "SELECT * FROM classifications ORDER BY classification_name";
  return pool.query(sql);
}