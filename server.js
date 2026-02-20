// server.js
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import accountRouter from './routes/account.js';
import inventoryRouter from './routes/inventory.js';

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/account', accountRouter);
app.use('/inventory', inventoryRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('errors/404', { url: req.originalUrl });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('errors/500', { error: err });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});