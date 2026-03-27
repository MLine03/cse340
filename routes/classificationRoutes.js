import express from 'express';
import { handleAddClassification } from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/add-classification', handleAddClassification);

export default router;