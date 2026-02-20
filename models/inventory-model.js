const pool = require('../db');

async function getClassifications() {
  return pool.query('SELECT * FROM classifications ORDER BY classification_name');
}

async function addClassification(name) {
  const sql = 'INSERT INTO classifications (classification_name) VALUES ($1) RETURNING *';
  return pool.query(sql, [name]);
}

async function addVehicle(vehicle) {
  const sql = `
    INSERT INTO inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`;
  const params = [
    vehicle.classification_id,
    vehicle.inv_make,
    vehicle.inv_model,
    vehicle.inv_description,
    vehicle.inv_image,
    vehicle.inv_thumbnail,
    vehicle.inv_price,
    vehicle.inv_year,
    vehicle.inv_miles,
    vehicle.inv_color,
  ];
  return pool.query(sql, params);
}

module.exports = { getClassifications, addClassification, addVehicle };