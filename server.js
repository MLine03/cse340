const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const homeRouter = require('./routes/home');
const errorRouter = require('./routes/errorRoute');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session & flash
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', homeRouter);
app.use('*', errorRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));