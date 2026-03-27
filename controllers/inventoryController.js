// src/controllers/inventoryController.js
const inventoryModel = require('../models/inventoryModel');

// Render manage view
function manageView(req, res) {
  res.render('add-vehicle', {
    messages: req.flash('success'),
    errors: req.flash('error'),
  });
}

// Add classification
async function addClassification(req, res) {
  const { classificationName } = req.body;
  if (!classificationName) {
    req.flash('error', 'Classification name is required');
    return res.redirect('/inventory/manage');
  }
  try {
    await inventoryModel.addClassification(classificationName);
    req.flash('success', 'Classification added successfully');
    res.redirect('/inventory/manage');
  } catch (err) {
    req.flash('error', 'Error adding classification');
    res.redirect('/inventory/manage');
  }
}

// Add vehicle
async function addVehicle(req, res) {
  const vehicleData = req.body;
  // Server-side validation
  if (!vehicleData.make || !vehicleData.model || !vehicleData.year) {
    req.flash('error', 'Make, Model, and Year are required');
    return res.redirect('/inventory/manage');
  }
  try {
    await inventoryModel.addVehicle(vehicleData);
    req.flash('success', 'Vehicle added successfully');
    res.redirect('/inventory/manage');
  } catch (err) {
    req.flash('error', 'Error adding vehicle');
    res.redirect('/inventory/manage');
  }
}

// Vehicle detail
async function vehicleDetail(req, res) {
  const vehicleId = req.params.id;
  const vehicle = await inventoryModel.getVehicleById(vehicleId);
  if (!vehicle) {
    return res.status(404).send('Vehicle not found');
  }
  res.render('inventory-detail', { vehicle });
}

module.exports = { manageView, addClassification, addVehicle, vehicleDetail };