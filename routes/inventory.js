// routes/inventory.js
import express from 'express';
import {
  listInventory,
  addInventory,
  updateInventory,
  deleteInventory
} from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', listInventory);
router.get('/add', addInventory);
router.post('/add', addInventory);
router.get('/update/:id', updateInventory);
router.post('/update', updateInventory);
router.post('/delete/:id', deleteInventory);

export default router;