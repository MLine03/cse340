import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'vehicle_user',          // PostgreSQL user you created
  host: 'localhost',
  database: 'vehicle_db',        // Your database
  password: 'StrongPassword123', // Your password
  port: 5432
});

export async function getClassifications() {
  const res = await pool.query('SELECT * FROM classifications ORDER BY name');
  return res.rows;
}

export async function addClassification(name) {
  const res = await pool.query(
    'INSERT INTO classifications (name) VALUES ($1) RETURNING id',
    [name]
  );
  return res.rows[0].id;
}

export async function addVehicle(data) {
  const { make, model, year, price, description, classificationId } = data;
  const res = await pool.query(
    `INSERT INTO vehicles 
    (make, model, year, price, description, classification_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [make, model, year, price, description, classificationId]
  );
  return res.rows[0].id;
}