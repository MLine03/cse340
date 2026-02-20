require('dotenv').config(); // Load .env variables
const express = require('express');
const session = require('express-session');
const path = require('path');

// Create Express app
const app = express();

// Import routes
const inventoryRoutes = require('./routes/inventory-routes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware (optional if needed for your assignment)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set true if HTTPS
  })
);

// Set view engine
app.set('view engine', 'ejs'); // Or 'pug', 'hbs' depending on your setup
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', inventoryRoutes);

// 404 handler (non-existent routes)
app.use((req, res) => {
  res.status(404).render('errors/404', { title: 'Page Not Found' });
});

// 500 handler (errors from controllers)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('errors/500', {
    title: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});