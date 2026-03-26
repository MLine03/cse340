const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(flash());

// Routes
app.use('/inv', inventoryRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).render('errors/404');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('errors/error', { message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));