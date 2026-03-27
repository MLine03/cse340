// routes/vehicles.js
import express from 'express';
import {
  getClassifications,
  getVehiclesByClassification,
  getAllVehicles
} from '../models/vehicleModel.js';

const router = express.Router();

// List all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await getAllVehicles();
    res.render('vehicles/index', { vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List vehicles by classification
router.get('/classification/:classification_id', async (req, res) => {
  try {
    const classification_id = req.params.classification_id;
    const vehicles = await getVehiclesByClassification(classification_id);
    res.render('vehicles/list', { vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;