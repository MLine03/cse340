// models/inventory-model.js
const db = require('../db');

async function getClassifications() {
  const [rows] = await db.query('SELECT * FROM carclassification ORDER BY classification_name');
  return rows;
}

async function addVehicle(vehicle) {
  const sql = `
    INSERT INTO inventory
      (make, model, year, price, mileage, classification_id)
    VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    vehicle.make,
    vehicle.model,
    vehicle.year,
    vehicle.price,
    vehicle.mileage,
    vehicle.classification
  ];
  const [result] = await db.query(sql, params);
  return result.insertId; // return new vehicle ID
}

async function getVehicleById(id) {
  const sql = `
    SELECT v.*, c.classification_name
    FROM inventory v
    JOIN carclassification c ON v.classification_id = c.classification_id
    WHERE v.vehicle_id = ?`;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

module.exports = {
  getClassifications,
  addVehicle,
  getVehicleById
};