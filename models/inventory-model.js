const pool = require('../db/connection');

// Add Classification
exports.addClassification = async (classification_name) => {
    const sql = 'INSERT INTO classification (classification_name) VALUES ($1)';
    await pool.query(sql, [classification_name]);
};

// Add Inventory
exports.addInventory = async (itemData) => {
    const sql = `INSERT INTO inventory 
        (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
    
    const values = [
        itemData.inv_make,
        itemData.inv_model,
        itemData.inv_year,
        itemData.inv_description,
        itemData.inv_image || '/images/no-image.png',
        itemData.inv_thumbnail || '/images/no-image.png',
        itemData.inv_price,
        itemData.inv_miles,
        itemData.inv_color,
        itemData.classification_id
    ];
    await pool.query(sql, values);
};

// Get Vehicle by ID
exports.getInventoryById = async (inv_id) => {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
};

// Get all classifications
exports.getClassifications = async () => {
    const sql = 'SELECT * FROM classification';
    return await pool.query(sql);
};