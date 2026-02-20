const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/yourdb"
});

module.exports = pool;
