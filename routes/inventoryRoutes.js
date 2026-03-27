import express from 'express';
import { showHome, handleAddVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/', showHome);
router.post('/add-vehicle', handleAddVehicle);

export default router;