// database.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "cse340",  // <-- your actual database name
  user: "mac",          // <-- your Postgres role (you connected as "mac")
  password: "",         // <-- leave blank if you have no password
  port: 5432,
});

module.exports = pool;
