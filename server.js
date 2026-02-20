// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const inventoryRoutes = require('./routes/inventory-routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/inv', inventoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});