const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities');

exports.showClassification = async (req, res, next) => {
  try {
    const classification_id = req.params.classification_id;
    const vehicles = await inventoryModel.getVehiclesByClassification(classification_id);
    res.render('inventory/classification', { title: 'Vehicles', vehicles });
  } catch (err) {
    next(err);
  }
};

exports.showVehicleDetail = async (req, res, next) => {
  try {
    const inv_id = req.params.inv_id;
    const vehicle = await inventoryModel.getVehicleById(inv_id);
    if (!vehicle) return res.status(404).render('errors/404', { title: 'Not Found' });

    const vehicleHTML = utilities.buildVehicleHTML(vehicle);
    res.render('inventory/detail', { title: `${vehicle.make} ${vehicle.model}`, vehicleHTML });
  } catch (err) {
    next(err);
  }
};

exports.triggerError = (req, res, next) => {
  next(new Error('Intentional 500 error'));
};