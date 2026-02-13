// models/inventory.js
const db = require('./db'); // your db.js

async function getAllItems() {
  const result = await db.query('SELECT * FROM inventory');
  return result.rows;
}

async function createItem({ item_name, quantity, price }) {
  const result = await db.query(
    'INSERT INTO inventory (item_name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
    [item_name, quantity, price]
  );
  return result.rows[0];
}

module.exports = {
  getAllItems,
  createItem
};
