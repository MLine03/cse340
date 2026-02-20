import * as inventoryModel from '../models/inventoryModel.js';

export const listInventory = async (req, res) => {
  const inventory = await inventoryModel.getAllInventory();
  res.render('inventory/list', { inventory });
};

export const addInventory = async (req, res) => {
  await inventoryModel.addInventory(req.body);
  res.redirect('/inventory');
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;
  await inventoryModel.updateInventory(id, req.body);
  res.redirect('/inventory');
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  await inventoryModel.deleteInventory(id);
  res.redirect('/inventory');
};