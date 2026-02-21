import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import accountRoutes from './routes/account.js';
import inventoryRoutes from './routes/inventory.js';
import path from 'path';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// View engine
app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');

// Middleware to attach logged-in account to res.locals
app.use((req, res, next) => {
  res.locals.accountData = req.session.account || null;
  next();
});

// Routes
app.use('/auth', accountRoutes);
app.use('/account', accountRoutes);
app.use('/inventory', inventoryRoutes);

app.get('/', (req, res) => res.redirect('/inventory'));

// Error handling
app.use((req, res) => res.status(404).render('errors/404'));
app.use((err, req, res, next) => res.status(500).render('errors/500', { error: err }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));