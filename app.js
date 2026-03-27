// app.js
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventoryRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use(flash());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/inventory', inventoryRoutes);

// Default route
app.get('/', (req, res) => {
  res.redirect('/inventory/add-vehicle');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});