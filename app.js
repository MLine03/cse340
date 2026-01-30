const express = require('express');
const app = express();
const path = require('path');
const inventoryRoutes = require('./routes/inventory-routes');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/inventory', inventoryRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('error', { title: '404', message: 'Page Not Found' });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('error', { title: '500', message: `An unexpected error occurred: ${err.message}` });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
