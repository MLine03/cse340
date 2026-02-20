// controllers/inventoryController.js
import * as inventoryModel from '../models/inventoryModel.js';

/**
 * Display all inventory
 */
export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.render('inventory/list', { inventory });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

/**
 * Add new inventory item
 */
export const addInventory = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    await inventoryModel.addInventory({ name, description, price, quantity });
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

/**
 * Update inventory item
 */
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    await inventoryModel.updateInventory(id, { name, description, price, quantity });
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

/**
 * Delete inventory item
 */
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    await inventoryModel.deleteInventory(id);
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};