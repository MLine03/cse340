// testDb.js
const pool = require('./db'); // correct path

async function testDb() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

testDb();