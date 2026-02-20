require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const inventoryRoutes = require('./routes/inventory-routes');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', inventoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('errors/404', { url: req.originalUrl });
});

// 500 handler
app.use((err, req, res, next) => {
  console.error('Error caught:', err);
  res.status(err.status || 500).render('errors/500', { message: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err.stack)

  const status = err.status || 500
  res.status(status).render("errors/error", {
    title: status === 404 ? "404 Not Found" : "Server Error",
    message: err.message,
    nav: "",
  })
})
app.use((err, req, res, next) => {
  console.error(err.stack)

  const status = err.status || 500
  res.status(status).render("errors/error", {
    title: status === 404 ? "404 Not Found" : "Server Error",
    message: err.message,
    nav: "",
  })
})