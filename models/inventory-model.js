// src/models/inventoryModel.js
const db = require('../db');

async function addClassification(classificationName) {
  const sql = 'INSERT INTO classifications (classification_name) VALUES (?)';
  const [result] = await db.execute(sql, [classificationName]);
  return result;
}

async function addVehicle(vehicleData) {
  const sql = `
    INSERT INTO inventory
    (make, model, year, description, price, miles, color, classification_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await db.execute(sql, [
    vehicleData.make,
    vehicleData.model,
    vehicleData.year,
    vehicleData.description,
    vehicleData.price,
    vehicleData.miles,
    vehicleData.color,
    vehicleData.classification_id
  ]);
  return result;
}

async function getVehicleById(id) {
  const sql = 'SELECT * FROM inventory WHERE inv_id = ?';
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
}

module.exports = { addClassification, addVehicle, getVehicleById };