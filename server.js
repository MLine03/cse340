import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import accountRouter from './routes/accountRoute.js';
import authRouter from './routes/auth.js';
import inventoryRouter from './routes/inventoryRoute.js';
import homeRouter from './routes/home.js';
import logoutRouter from './routes/logout.js';
import errorRouter from './routes/errorRoute.js';

// Utilities
import { db } from './utils/db-connection.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/account', accountRouter);
app.use('/auth', authRouter);
app.use('/inventory', inventoryRouter);
app.use('/logout', logoutRouter);
app.use('/', homeRouter);

// Error handling
app.use(errorRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});