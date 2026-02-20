const pool = require('./database/connection');

async function testQuery() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  } finally {
    await pool.end();
  }
}

testQuery();