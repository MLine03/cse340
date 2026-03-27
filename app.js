import session from 'express-session';
import pgSession from 'connect-pg-simple';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'vehicle_user',
  host: 'localhost', // or process.env.DB_HOST for Render
  database: 'vehicle_db',
  password: 'StrongPassword123',
  port: 5432
});

app.use(
  session({
    store: new pgSession({
      pool: pool,                // Use your PostgreSQL pool
      tableName: 'session'       // Table to store sessions
    }),
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: false,   // usually false in production
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })
);