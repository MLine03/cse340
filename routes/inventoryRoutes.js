// routes/inventoryRoutes.js
import express from 'express';
import { getAllVehicles } from '../models/vehicleModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vehicles = await getAllVehicles();
    res.render('inventory/index', { vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;