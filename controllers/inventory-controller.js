const invModel = require('../models/inventory-model');
const Util = require('../utils/index');

const inventoryController = {};

// Management View
inventoryController.managementView = async (req, res) => {
  const message = req.session.message || null;
  req.session.message = null;
  res.render('inventory/management', { message });
};

// Add Classification View
inventoryController.addClassificationView = async (req, res) => {
  const message = req.session.message || null;
  req.session.message = null;
  res.render('inventory/add-classification', { message });
};

// Handle New Classification
inventoryController.addClassification = async (req, res) => {
  try {
    const { classification_name } = req.body;
    if (!classification_name || /[^a-zA-Z0-9]/.test(classification_name)) {
      req.session.message = 'Invalid classification name.';
      return res.redirect('/inv/add-classification');
    }
    await invModel.addClassification(classification_name);
    req.session.message = 'Classification added successfully!';
    res.redirect('/inv');
  } catch (error) {
    console.error(error);
    req.session.message = 'Error adding classification.';
    res.redirect('/inv/add-classification');
  }
};

// Add Vehicle View
inventoryController.addVehicleView = async (req, res) => {
  const classificationList = await Util.buildClassificationList();
  const message = req.session.message || null;
  req.session.message = null;
  res.render('inventory/add-vehicle', { classificationList, message });
};

// Handle New Vehicle
inventoryController.addVehicle = async (req, res) => {
  try {
    const vehicle = req.body;
    // Basic server-side validation
    if (!vehicle.inv_make || !vehicle.inv_model || !vehicle.inv_year || !vehicle.inv_miles || !vehicle.inv_price) {
      req.session.message = 'Please fill all required fields.';
      return res.redirect('/inv/add-vehicle');
    }
    await invModel.addVehicle(vehicle);
    req.session.message = 'Vehicle added successfully!';
    res.redirect('/inv');
  } catch (error) {
    console.error(error);
    req.session.message = 'Error adding vehicle.';
    res.redirect('/inv/add-vehicle');
  }
};

module.exports = inventoryController;