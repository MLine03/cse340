// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const inventoryRoutes = require('./src/routes/inventoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes
app.use('/inventory', inventoryRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/inventory/manage');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});