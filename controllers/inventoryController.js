const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities'); // optional helper functions

exports.buildManagementView = async (req, res) => {
  try {
    const classifications = await inventoryModel.getClassifications();
    res.render('inventory/manage', { classifications, message: req.flash('message') });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.addClassification = async (req, res) => {
  const { classification_name } = req.body;
  if (!classification_name) {
    req.flash('message', 'Classification name is required');
    return res.redirect('/inventory/manage');
  }
  try {
    const result = await inventoryModel.insertClassification(classification_name);
    req.flash('message', `Classification added: ${classification_name}`);
    res.redirect('/inventory/manage');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.addVehicle = async (req, res) => {
  const { make, model, year, price, classification_id } = req.body;
  if (!make || !model || !year || !price || !classification_id) {
    req.flash('message', 'All fields are required');
    return res.redirect('/inventory/manage');
  }
  try {
    const result = await inventoryModel.insertVehicle({ make, model, year, price, classification_id });
    req.flash('message', `Vehicle added: ${make} ${model}`);
    res.redirect('/inventory/manage');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};