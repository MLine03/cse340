import express from 'express';
import { getInventoryDetail } from '../controllers/inventoryController.js';
const router = express.Router();

// Detail view
router.get('/detail/:inv_id', getInventoryDetail);

export default router;