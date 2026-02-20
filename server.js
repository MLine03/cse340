const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const invRouter = require('./routes/inventory');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/inv', invRouter);

// Root redirect
app.get('/', (req, res) => res.redirect('/inv'));

// 404 fallback
app.use((req, res) => res.status(404).render('errors/404', { title: 'Page Not Found' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));