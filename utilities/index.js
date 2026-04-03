import pool from "../database/pool.js";

export const getInventory = async () => {
  const result = await pool.query("SELECT * FROM inventory ORDER BY id DESC");
  return result.rows.map(v => `<li>${v.make} ${v.model} - $${v.price.toLocaleString()}</li>`).join("");
};

export const getInventoryDetail = async (id) => {
  const result = await pool.query("SELECT * FROM inventory WHERE id = $1", [id]);
  if (!result.rows[0]) throw new Error("Vehicle not found");
  const v = result.rows[0];
  return `
    <h2>${v.make} ${v.model} (${v.year})</h2>
    <img src="${v.image}" alt="${v.make} ${v.model}" style="max-width:400px;">
    <p>Price: $${v.price.toLocaleString()}</p>
    <p>Mileage: ${v.miles.toLocaleString()} miles</p>
    <p>${v.description}</p>
  `;
};