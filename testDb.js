const pool = require("./models/db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected:", res.rows);
    process.exit(0);
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
})();