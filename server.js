// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/inventory', inventoryRoutes);

// Root route
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Welcome to Vehicle Inventory', 
    message: req.flash('info') 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('errors/404', { title: '404 - Page Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('errors/500', { title: '500 - Server Error', error: err });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});