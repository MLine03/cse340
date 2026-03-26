const invModel = require('../models/inventory-model');

async function buildInventoryList(req, res, next) {
  try {
    const vehicles = await invModel.getAllVehicles();
    res.render('inventory/list', { title: 'Vehicle Inventory', vehicles, messages: req.flash('message') });
  } catch (err) {
    next(err);
  }
}

async function buildInventoryDetail(req, res, next) {
  try {
    const vehicle = await invModel.getVehicleById(req.params.inv_id);
    if (!vehicle) throw new Error('Vehicle not found');
    res.render('inventory/detail', { title: `${vehicle.inv_make} ${vehicle.inv_model}`, vehicle });
  } catch (err) {
    next(err);
  }
}

async function addNewVehicle(req, res, next) {
  try {
    const data = req.body;
    if (!data.inv_make || !data.inv_model) {
      req.flash('message', 'Make and Model are required');
      return res.redirect('/inventory/add');
    }
    const newVehicle = await invModel.addVehicle(data);
    req.flash('message', 'Vehicle added successfully!');
    res.redirect(`/inventory/detail/${newVehicle.inv_id}`);
  } catch (err) {
    next(err);
  }
}

module.exports = { buildInventoryList, buildInventoryDetail, addNewVehicle };