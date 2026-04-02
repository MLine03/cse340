// models/inventoryModel.js
import pool from "../database/connection.js";

export async function getInventoryItems() {
  const sql = "SELECT * FROM inventory";
  const result = await pool.query(sql);
  return result.rows;
}

export async function addInventoryItem(item) {
  const sql = `
    INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price)
    VALUES ($1,$2,$3,$4) RETURNING inv_id
  `;
  const result = await pool.query(sql, [item.make, item.model, item.year, item.price]);
  return result.rows[0];
}