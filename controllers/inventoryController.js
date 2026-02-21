// controllers/inventoryController.js
import * as inventoryModel from '../models/inventoryModel.js';

// GET /inventory
export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error retrieving inventory');
  }
};

// POST /inventory/add
export const addInventory = async (req, res) => {
  try {
    const newItem = await inventoryModel.addInventoryItem(req.body);
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error adding inventory');
  }
};

// POST /inventory/delete/:id
export const deleteInventory = async (req, res) => {
  try {
    const deletedItem = await inventoryModel.deleteInventoryItem(req.params.id);
    res.json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error deleting inventory');
  }
};