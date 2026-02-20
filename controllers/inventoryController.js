// controllers/inventoryController.js
import * as inventoryModel from '../models/inventoryModel.js';

// Inventory routes
export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.render('inventory/manage', { inventory, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

export const addInventoryItem = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    await inventoryModel.addInventory({ name, quantity, price });
    res.redirect('/inventory/manage');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const { id, name, quantity, price } = req.body;
    await inventoryModel.updateInventory(id, { name, quantity, price });
    res.redirect('/inventory/manage');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await inventoryModel.deleteInventory(id);
    res.redirect('/inventory/manage');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};