// controllers/inventoryController.js
const inventoryModel = require('../models/inventory-model');

async function showAddVehicleForm(req, res) {
  const classifications = await inventoryModel.getClassifications();
  res.render('add-vehicle', { classifications, formData: null, messages: [] });
}

async function handleAddVehicle(req, res) {
  const { make, model, year, price, mileage, classification } = req.body;
  const messages = [];

  if (!make) messages.push("Make is required");
  if (!model) messages.push("Model is required");
  if (!year || year < 1900 || year > 2100) messages.push("Year must be between 1900 and 2100");
  if (!price || price <= 0) messages.push("Price must be greater than 0");
  if (!mileage || mileage < 0) messages.push("Mileage must be 0 or more");
  if (!classification) messages.push("Classification is required");

  if (messages.length > 0) {
    const classifications = await inventoryModel.getClassifications();
    return res.render('add-vehicle', { classifications, formData: req.body, messages });
  }

  try {
    const vehicleId = await inventoryModel.addVehicle(req.body);
    res.redirect(`/inventory/vehicle/${vehicleId}`);
  } catch (err) {
    console.error(err);
    messages.push("Error adding vehicle to the database");
    const classifications = await inventoryModel.getClassifications();
    res.render('add-vehicle', { classifications, formData: req.body, messages });
  }
}

async function showVehicleDetail(req, res) {
  const id = req.params.id;
  try {
    const vehicle = await inventoryModel.getVehicleById(id);
    if (!vehicle) return res.status(404).send("Vehicle not found");
    res.render('vehicle-detail', { vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  showAddVehicleForm,
  handleAddVehicle,
  showVehicleDetail
};