const invModel = require('../models/inventoryModel');
const util = require('../utilities');

exports.buildManagementView = async (req, res) => {
  const message = req.session.message || null;
  delete req.session.message;
  res.render('inventory/management', { title: 'Inventory Management', message });
};

exports.buildAddClassification = (req, res) => {
  res.render('inventory/add-classification', {
    title: 'Add Classification',
    errors: req.session.errors || [],
    data: {}
  });
  delete req.session.errors;
};

exports.addClassification = async (req, res) => {
  const { classification_name } = req.body;
  try {
    const result = await invModel.insertClassification(classification_name);
    req.session.message = `Classification "${classification_name}" added successfully.`;
    res.redirect('/inv');
  } catch (err) {
    console.error(err);
    req.session.errors = [{ msg: 'Failed to add classification.' }];
    res.render('inventory/add-classification', { title: 'Add Classification', errors: req.session.errors, data: req.body });
  }
};

exports.buildAddVehicle = async (req, res) => {
  const classificationList = await util.buildClassificationList();
  res.render('inventory/add-vehicle', {
    title: 'Add Vehicle',
    errors: req.session.errors || [],
    data: {},
    classificationList
  });
  delete req.session.errors;
};

exports.addVehicle = async (req, res) => {
  const { inv_make, inv_model, inv_year, classification_id } = req.body;
  try {
    const result = await invModel.insertVehicle({ inv_make, inv_model, inv_year, classification_id });
    req.session.message = `Vehicle "${inv_make} ${inv_model}" added successfully.`;
    res.redirect('/inv');
  } catch (err) {
    console.error(err);
    const classificationList = await util.buildClassificationList(classification_id);
    req.session.errors = [{ msg: 'Failed to add vehicle.' }];
    res.render('inventory/add-vehicle', { title: 'Add Vehicle', errors: req.session.errors, data: req.body, classificationList });
  }
};