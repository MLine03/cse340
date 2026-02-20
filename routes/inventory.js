// routes/inventory.js
import express from 'express';
import { getInventory, addInventory, updateInventory, deleteInventory } from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/add', addInventory);
router.post('/update/:id', updateInventory);
router.post('/delete/:id', deleteInventory);

export default router;