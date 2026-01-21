const pool = require("./database")

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()")
    console.log("Database connected! Time:", result.rows[0])
  } catch (error) {
    console.error("Database connection failed:", error)
  }
}

testConnection()
