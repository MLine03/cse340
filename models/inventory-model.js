// models/inventory-model.js
const pool = require('../db'); // your db connection

// Get all inventory
exports.getAllInventory = async function () {
  return pool.query('SELECT * FROM inventory ORDER BY inv_make');
};

// Get single vehicle by ID
exports.getVehicleById = async function (inv_id) {
  const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
  const values = [inv_id];
  return pool.query(sql, values);
};