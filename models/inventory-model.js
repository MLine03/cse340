const pool = require('../utils/db-connection'); // Assume you have pg Pool configured

exports.addClassification = async (name) => {
  try {
    await pool.query('INSERT INTO classification (classification_name) VALUES ($1)', [name]);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

exports.addVehicle = async (vehicle) => {
  const { classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color } = vehicle;
  try {
    await pool.query(
      `INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color]
    );
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

exports.getClassifications = async () => {
  try {
    const result = await pool.query('SELECT * FROM classification ORDER BY classification_name');
    return result;
  } catch (err) {
    console.error(err);
    return { rows: [] };
  }
};