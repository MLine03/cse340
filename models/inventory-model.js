// Mock pool
const pool = {
  query: async (sql, params) => {
    // Sample data
    return {
      rows: [
        {
          inv_id: 1,
          inv_make: "Toyota",
          inv_model: "Corolla",
          inv_price: 20000,
          inv_thumbnail: "/images/toyota-corolla.jpg",
          classification_name: "Sedan",
          classification_id: 1
        },
        {
          inv_id: 2,
          inv_make: "Honda",
          inv_model: "Civic",
          inv_price: 22000,
          inv_thumbnail: "/images/honda-civic.jpg",
          classification_name: "Sedan",
          classification_id: 1
        }
      ]
    }
  }
}

/* Get inventory by classification_id */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM inventory WHERE classification_id = $1",
      [classification_id]
    )
    return data.rows.filter(row => row.classification_id == classification_id)
  } catch (err) {
    console.error(err)
  }
}

async function getClassifications() {
  return [
    { classification_id: 1, classification_name: "Sedan" },
    { classification_id: 2, classification_name: "SUV" }
  ]
}

module.exports = { getInventoryByClassificationId, getClassifications }
