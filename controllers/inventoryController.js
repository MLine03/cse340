// controllers/inventoryController.js
import inventoryModel from '../models/inventoryModel.js';

export const getInventory = async (req, res) => {
  const items = await inventoryModel.getAllInventory();
  res.render('inventory/list', { items });
};

export const addInventory = async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !price || !stock) return res.status(400).send('All fields are required');
  await inventoryModel.insertInventory({ name, description, price, stock });
  res.redirect('/inventory');
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  await inventoryModel.deleteInventory(id);
  res.redirect('/inventory');
};