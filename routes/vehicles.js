// routes/vehicles.js
import express from 'express';
import {
  getClassifications,
  getAllVehicles,
  getVehiclesByClassification,
  getVehicleById,
} from '../models/vehicleModel.js'; // Names must match exactly

const router = express.Router();

// Display all vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await getAllVehicles();
    res.render('vehicles', { vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Display vehicles by classification
router.get('/vehicles/classification/:id', async (req, res) => {
  try {
    const classificationId = req.params.id;
    const vehicles = await getVehiclesByClassification(classificationId);
    res.render('vehicles', { vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Display single vehicle
router.get('/vehicle/:id', async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await getVehicleById(vehicleId);
    res.render('vehicle-detail', { vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;