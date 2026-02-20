// controllers/inventoryController.js
import * as inventoryModel from '../models/inventoryModel.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.render('inventory/list', { inventory, message: null, errors: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

export const addInventory = async (req, res) => {
  try {
    await inventoryModel.addInventory(req.body);
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const id = req.params.id;
    await inventoryModel.updateInventory(id, req.body);
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const id = req.params.id;
    await inventoryModel.deleteInventory(id);
    res.redirect('/inventory');
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};