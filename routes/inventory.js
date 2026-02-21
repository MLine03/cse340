import express from 'express';
import { getInventory, addInventoryItem, deleteInventoryItem } from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/add', addInventoryItem);
router.post('/delete/:id', deleteInventoryItem);

export default router;