import express from 'express';
import { getClassification, getVehicleDetail } from '../controllers/inventoryController.js';

const router = express.Router();

// Show classification list
router.get('/classification/:classificationId', getClassification);

// Vehicle detail view
router.get('/detail/:inventoryId', getVehicleDetail);

export default router;