const pool = require("../database/");

// Add favorite
async function addFavorite(account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO favorites (account_id, inv_id)
      VALUES ($1, $2)
      RETURNING *`;
    return await pool.query(sql, [account_id, inv_id]);
  } catch (error) {
    console.error("addFavorite error:", error);
    throw error;
  }
}

// Get all favorites for a user
async function getFavorites(account_id) {
  try {
    const sql = `
      SELECT i.*
      FROM favorites f
      JOIN inventory i ON f.inv_id = i.inv_id
      WHERE f.account_id = $1`;
    return await pool.query(sql, [account_id]);
  } catch (error) {
    console.error("getFavorites error:", error);
    throw error;
  }
}

// Remove favorite
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = `
      DELETE FROM favorites
      WHERE account_id = $1 AND inv_id = $2`;
    return await pool.query(sql, [account_id, inv_id]);
  } catch (error) {
    console.error("removeFavorite error:", error);
    throw error;
  }
}

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite
};