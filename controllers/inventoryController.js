const model = require('../models/inventory-model');
const utilities = require('../utilities');

// Show vehicles by classification
async function showClassification(req, res, next) {
  try {
    const classification_id = req.params.classification_id;
    const vehicles = await model.getVehiclesByClassification(classification_id);
    res.render('index', { vehicles, title: 'Classification View' });
  } catch (error) {
    next(error);
  }
}

// Show vehicle detail
async function showVehicleDetail(req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const vehicle = await model.getVehicleById(inv_id);
    if (!vehicle) {
      const err = new Error('Vehicle not found');
      err.status = 404;
      throw err;
    }
    const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle);
    res.render('inventory/detail', { vehicleHTML, title: `${vehicle.make} ${vehicle.model}` });
  } catch (error) {
    next(error);
  }
}

// Footer intentional 500 error
function triggerError(req, res, next) {
  const err = new Error('Intentional server error triggered!');
  err.status = 500;
  next(err);
}

module.exports = {
  showClassification,
  showVehicleDetail,
  triggerError
};