const pool = require("./database")

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()")
    console.log("Database connected!", result.rows)
  } catch (error) {
    console.error("DB connection failed:", error)
  }
}

testDB()