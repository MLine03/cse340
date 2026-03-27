const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',      // or Render DB host
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;