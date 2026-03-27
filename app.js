import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import inventoryRoutes from './routes/inventoryRoutes.js';
import classificationRoutes from './routes/classificationRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'superSecretKey',
  resave: false,
  saveUninitialized: true
}));

// View engine
app.set('view engine', 'ejs');

// Routes
app.use('/inventory', inventoryRoutes);
app.use('/classification', classificationRoutes);

// Home route (IMPORTANT)
app.get('/', (req, res) => {
  res.redirect('/inventory');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});