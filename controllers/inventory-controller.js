const invModel = require('../models/inventory-model');
const Util = require('../utils/index');

async function showManagement(req, res) {
  const message = req.session.message;
  req.session.message = null;
  res.render('inventory/management', { title: 'Inventory Management', message });
}

async function addClassificationView(req, res) {
  const message = req.session.message;
  req.session.message = null;
  res.render('inventory/add-classification', { title: 'Add Classification', message });
}

async function addClassification(req, res) {
  const { classification_name } = req.body;
  if (!classification_name || /\W/.test(classification_name)) {
    req.session.message = 'Invalid classification name.';
    return res.redirect('/inv/add-classification');
  }
  try {
    await invModel.addClassification(classification_name);
    req.session.message = 'Classification added successfully!';
    res.redirect('/inv');
  } catch (err) {
    console.error(err);
    req.session.message = 'Error adding classification.';
    res.redirect('/inv/add-classification');
  }
}

async function addVehicleView(req, res) {
  const classifications = await Util.buildClassificationList();
  const message = req.session.message;
  req.session.message = null;
  res.render('inventory/add-vehicle', { title: 'Add Vehicle', classifications, message, sticky: {} });
}

async function addVehicle(req, res) {
  const vehicle = req.body;
  // Server-side validation
  if (!vehicle.inv_make || !vehicle.inv_model || !vehicle.inv_description || !vehicle.classification_id) {
    req.session.message = 'All required fields must be filled.';
    return res.redirect('/inv/add-vehicle');
  }
  try {
    await invModel.addVehicle(vehicle);
    req.session.message = 'Vehicle added successfully!';
    res.redirect('/inv');
  } catch (err) {
    console.error(err);
    req.session.message = 'Error adding vehicle.';
    res.redirect('/inv/add-vehicle');
  }
}

module.exports = { showManagement, addClassificationView, addClassification, addVehicleView, addVehicle };