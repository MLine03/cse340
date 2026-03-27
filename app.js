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
  user: 'vehicle_user',          // Your DB user
  host: 'localhost',             // Change if using remote DB
  database: 'vehicle_db',        // Your DB name
  password: 'StrongPassword123', // Your DB password
  port: 5432,
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
    secret: 'SuperSecretSessionKey', // Change in production!
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
app.use('/', vehicleRoutes);
app.use('/classification', classificationRoutes);
app.use('/inventory', inventoryRoutes);

// Home route (optional)
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
    console.error(`Port ${PORT} is already in use. Try stopping other servers or changing the port.`);
  } else {
    console.error(err);
  }
});