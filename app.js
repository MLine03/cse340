const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// View engine
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/home'));
app.use('/account', require('./routes/accountRoute'));
app.use('/inventory', require('./routes/inventoryRoute'));
app.use('/review', require('./routes/reviewRoute'));
app.use(require('./routes/errorRoute'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});