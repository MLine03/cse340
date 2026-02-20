const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const accountsRouter = require('./routes/accounts');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/account', accountsRouter);

// Home route
app.get('/', (req, res) => {
    res.render('partials/header', { user: req.user }); // Optional: render header partial
});

// 404
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));