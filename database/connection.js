const pg = require("pg");

const pool = new pg.Pool({
  user: "your_db_user",
  password: "your_db_password",
  host: "localhost",
  port: 5432,
  database: "your_db_name",
});

module.exports = pool;
