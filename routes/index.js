// routes/inventory.js
import express from 'express';
import { getInventory, addInventory, deleteInventory } from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/add', addInventory);
router.post('/delete/:id', deleteInventory);

export default router;