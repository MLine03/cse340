// routes/inventory.js
import express from 'express';
import { getInventory, addInventory, deleteInventory } from '../controllers/inventoryController.js';

const router = express.Router();

// Get all inventory
router.get('/', getInventory);

// Add inventory item
router.post('/add', addInventory);

// Delete inventory item
router.post('/delete/:id', deleteInventory);

export default router;