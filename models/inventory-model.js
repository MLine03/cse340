const pool = require('../db');

const invModel = {};

// Get all classifications
invModel.getClassifications = async function() {
  const sql = 'SELECT * FROM public.classification ORDER BY classification_name';
  return pool.query(sql);
};

// Insert new classification
invModel.addClassification = async function(classification_name) {
  const sql = 'INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *';
  return pool.query(sql, [classification_name]);
};

// Insert new vehicle
invModel.addVehicle = async function(vehicle) {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = vehicle;
  const sql = `
    INSERT INTO public.inventory 
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`;
  return pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color]);
};

module.exports = invModel;