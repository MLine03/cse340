require('dotenv').config();
const express = require('express');
const session = require('express-session');
const inventoryRoutes = require('./routes/inventory-routes');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/inv', inventoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});