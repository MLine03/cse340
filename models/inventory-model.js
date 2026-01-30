const pool = require('../database/connection');

// Get vehicles by classification
async function getVehiclesByClassification(classificationId) {
    const sql = 'SELECT * FROM inventory WHERE classification_id = $1';
    const result = await pool.query(sql, [classificationId]);
    return result.rows;
}

// Get single vehicle by inv_id
async function getVehicleById(invId) {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const result = await pool.query(sql, [invId]);
    return result.rows[0];
}

module.exports = { getVehiclesByClassification, getVehicleById };
