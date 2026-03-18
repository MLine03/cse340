// testDB.js
const pool = require('./database') // adjust path if your pool is in /database/index.js

async function testDB() {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('Database connected!', result.rows)
  } catch (error) {
    console.error('DB connection failed:', error)
  }
}

testDB()