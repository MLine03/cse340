const { Pool } = require("pg");

const pool = new Pool({
  user: "mac",        // your PostgreSQL username
  host: "localhost",
  database: "cse340",
  password: "",       // if you have a password
  port: 5432,
});

module.exports = pool;
