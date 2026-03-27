// src/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'cse340',
});

module.exports = pool.promise();