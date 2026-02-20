// server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const inventoryRouter = require('./routes/inventory-routes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretKey',
  resave: false,
  saveUninitialized: true,
}));

// Set view engine
app.set('view engine', 'ejs');               // <- THIS fixes the error
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/inv', inventoryRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Vehicle Management System');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('errors/404', { title: 'Page Not Found' });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});