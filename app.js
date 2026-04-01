// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventoryRoutes');
const accountsRoutes = require('./routes/accountsRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/inventory', inventoryRoutes);
app.use('/accounts', accountsRoutes);

// 404 Error
app.use((req, res, next) => {
  res.status(404).render('errors/error', {
    title: 'Page Not Found',
    message: 'The page you requested does not exist.',
  });
});

// 500 Error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('errors/error', {
    title: 'Server Error',
    message: 'Oops! Something went wrong on the server.',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));