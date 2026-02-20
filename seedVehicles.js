// seedVehicles.js
const pool = require("./database/db");

(async () => {
  try {
    // Create table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        inv_id SERIAL PRIMARY KEY,
        make VARCHAR(50),
        model VARCHAR(50),
        year INT,
        price NUMERIC,
        mileage INT,
        image_full VARCHAR(255),
        description TEXT
      )
    `);
    console.log("Table 'vehicles' created or already exists.");

    // Insert sample data
    await pool.query(`
      INSERT INTO vehicles (make, model, year, price, mileage, image_full, description)
      VALUES
      ('Toyota', 'Camry', 2022, 25000, 5000, '/images/camry.jpg', 'Reliable midsize sedan.'),
      ('Honda', 'Civic', 2021, 22000, 10000, '/images/civic.jpg', 'Compact car with great fuel efficiency.')
      ON CONFLICT DO NOTHING;
    `);
    console.log("Sample vehicles inserted.");
    
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
})();