// server.js
const express = require('express');
const app = express();

const inventoryRoutes = require('./routes/inventoryRoute');
// Add other routes similarly, e.g., accountRoutes, reviewRoutes

app.use(express.json());
app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
