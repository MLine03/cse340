// server.js
import express from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventory.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // parse JSON request bodies

// Routes
app.use('/inventory', inventoryRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});