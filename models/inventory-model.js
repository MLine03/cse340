// models/inventory-model.js
const pool = require('../database/connection'); // your DB connection

// Get all vehicles for a classification
async function getVehiclesByClassification(classificationId) {
    try {
        const sql = 'SELECT * FROM inventory WHERE classification_id = $1';
        const result = await pool.query(sql, [classificationId]);
        return result.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}

// Get a single vehicle by ID
async function getVehicleById(vehicleId) {
    try {
        const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
        const result = await pool.query(sql, [vehicleId]);
        return result.rows[0]; // only one vehicle
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getVehiclesByClassification,
    getVehicleById,
};
