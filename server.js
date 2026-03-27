// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const inventoryRoutes = require('./routes/inventoryRoutes'); // ✅ fixed path

const app = express();
const PORT = process.env.PORT || 3000; // ✅ use Render port

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

// Routes
app.use('/inventory', inventoryRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});