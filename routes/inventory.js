// routes/inventory.js
import express from 'express';
import { getInventory, addInventory, updateInventory, deleteInventory } from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', getInventory); // list inventory
router.post('/add', addInventory); // add new item
router.post('/update/:id', updateInventory); // update item by ID
router.post('/delete/:id', deleteInventory); // delete item by ID

export default router;