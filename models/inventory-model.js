const pool = require('../db');

async function getAllVehicles() {
  const sql = 'SELECT * FROM inventory ORDER BY inv_make, inv_model';
  const result = await pool.query(sql);
  return result.rows;
}

async function getVehicleById(inv_id) {
  const sql = 'SELECT * FROM inventory WHERE inv_id=$1';
  const result = await pool.query(sql, [inv_id]);
  return result.rows[0];
}

async function addVehicle(data) {
  const { inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, classification_id } = data;
  const sql = `
    INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING inv_id
  `;
  const result = await pool.query(sql, [inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, classification_id]);
  return result.rows[0];
}

module.exports = { getAllVehicles, getVehicleById, addVehicle };