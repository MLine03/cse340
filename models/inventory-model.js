const db = require('../db');

module.exports = {
    getVehicleById: async (inv_id) => {
        const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
        const values = [inv_id];
        const result = await db.query(sql, values);
        return result.rows[0];
    },

    getClassifications: async () => {
        const sql = 'SELECT * FROM classifications ORDER BY classification_name';
        return await db.query(sql);
    },

    addClassification: async (classification_name) => {
        const sql = 'INSERT INTO classifications (classification_name) VALUES ($1)';
        const values = [classification_name];
        return await db.query(sql, values);
    },

    addInventory: async (vehicle) => {
        const sql = `INSERT INTO inventory 
            (inv_make, inv_model, inv_year, inv_price, inv_miles, inv_description, inv_image, inv_thumbnail, classification_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
        const values = [
            vehicle.inv_make,
            vehicle.inv_model,
            vehicle.inv_year,
            vehicle.inv_price,
            vehicle.inv_miles,
            vehicle.inv_description,
            vehicle.inv_image,
            vehicle.inv_thumbnail,
            vehicle.classification_id
        ];
        return await db.query(sql, values);
    }
};