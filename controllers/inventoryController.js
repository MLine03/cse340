// controllers/inventoryController.js
import * as inventoryModel from '../models/inventoryModel.js';

// Get all inventory
export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.render('inventory/index', { inventory, errors: null, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Add inventory
export const addInventoryItem = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    await inventoryModel.addInventoryItem({ name, description, price, quantity });
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Delete inventory
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await inventoryModel.deleteInventoryItem(id);
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};