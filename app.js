import express from 'express';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import inventoryRoutes from './routes/inventoryRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import { errorHandler, notFoundHandler } from './controllers/errorController.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Session
const PgSession = pgSession(session);
app.use(
  session({
    store: new PgSession({ conString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` }),
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use('/inventory', inventoryRoutes);
app.use('/account', accountRoutes);

// Footer error link
app.get('/trigger-error', (req, res, next) => {
  next(new Error('Intentional 500 error triggered'));
});

// 404 handler
app.use(notFoundHandler);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));