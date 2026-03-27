// routes/vehicles.js
import express from 'express';
import { getClassifications, getVehiclesByClassification } from '../models/vehicleModel.js';

const router = express.Router();

// GET all classifications
router.get('/', async (req, res, next) => {
  try {
    const classifications = await getClassifications();
    res.json({ message: 'Vehicle Classifications', classifications });
  } catch (err) {
    next(err);
  }
});

// GET vehicles by classification
router.get('/:classificationId', async (req, res, next) => {
  try {
    const { classificationId } = req.params;
    const vehicles = await getVehiclesByClassification(classificationId);
    res.json({ classificationId, vehicles });
  } catch (err) {
    next(err);
  }
});

export default router;