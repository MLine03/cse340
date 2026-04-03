const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
})

// Test DB connection when app starts
async function testConnection() {
  try {
    const client = await pool.connect()
    console.log("✅ PostgreSQL connected")
    client.release()
  } catch (err) {
    console.error("❌ PostgreSQL connection FAILED")
    console.error(err.message)
  }
}

testConnection()

module.exports = pool