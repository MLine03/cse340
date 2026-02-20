// controllers/inventoryController.js
import * as inventoryModel from '../models/inventoryModel.js';

// Get all inventory items
export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getInventory(); // <-- use getInventory, not getAllInventory
    res.render('inventory/list', { inventory });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Add inventory
export const addInventory = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  await inventoryModel.addInventory({ name, description, price, quantity });
  res.redirect('/inventory');
};

// Delete inventory
export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  await inventoryModel.deleteInventory(id);
  res.redirect('/inventory');
};