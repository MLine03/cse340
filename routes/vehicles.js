// routes/vehicles.js
import express from 'express';
import { getClassifications, getVehiclesByClassification } from '../models/vehicleModel.js';

const router = express.Router();

// Route: GET /vehicles
router.get('/', async (req, res, next) => {
  try {
    const classifications = await getClassifications();
    res.json({ message: 'Vehicles Home', classifications });
  } catch (err) {
    next(err);
  }
});

// Route: GET /vehicles/:classificationId
router.get('/:classificationId', async (req, res, next) => {
  const { classificationId } = req.params;
  try {
    const vehicles = await getVehiclesByClassification(classificationId);
    res.json({ classificationId, vehicles });
  } catch (err) {
    next(err);
  }
});

// Add more vehicle-related routes here as needed
// Example: POST, PUT, DELETE routes for vehicles

export default router;