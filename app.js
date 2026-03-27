// app.js
import express from 'express';
import session from 'express-session';
import pg from 'pg';
import pgSession from 'connect-pg-simple';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import vehicleRoutes from './routes/vehicles.js';
import classificationRoutes from './routes/classificationRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------
// PostgreSQL Connection
// -----------------------------
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER || 'vehicle_user',          // Use env vars in production
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'vehicle_db',
  password: process.env.DB_PASSWORD || 'StrongPassword123',
  port: process.env.DB_PORT || 5432,
});

// -----------------------------
// Session Store in PostgreSQL
// -----------------------------
const pgStore = pgSession(session);

app.use(
  session({
    store: new pgStore({
      pool: pool,                // Connection pool
      tableName: 'session',      // Table created earlier
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'SuperSecretSessionKey', // Change in prod!
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// -----------------------------
// Middleware
// -----------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------
// Routes
// -----------------------------
app.use('/vehicles', vehicleRoutes);        // Correct route prefix
app.use('/classification', classificationRoutes);
app.use('/inventory', inventoryRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index', { message: 'Welcome to Vehicle Inventory!' });
});

// -----------------------------
// Start Server (handle EADDRINUSE)
// -----------------------------
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop other servers or change the port.`);
    process.exit(1);
  } else {
    console.error(err);
  }
});