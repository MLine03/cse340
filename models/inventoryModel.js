import pool from "../database/connection.js";

export async function getInventory() {
  const sql = "SELECT * FROM inventory";
  const result = await pool.query(sql);
  return result.rows;
}

export async function addInventory(item) {
  const { name, description, quantity } = item;
  const sql = "INSERT INTO inventory (name, description, quantity) VALUES ($1,$2,$3)";
  await pool.query(sql, [name, description, quantity]);
}

export async function updateInventory(id, item) {
  const { name, description, quantity } = item;
  const sql = "UPDATE inventory SET name=$1, description=$2, quantity=$3 WHERE id=$4";
  await pool.query(sql, [name, description, quantity, id]);
}

export async function deleteInventory(id) {
  const sql = "DELETE FROM inventory WHERE id=$1";
  await pool.query(sql, [id]);
}