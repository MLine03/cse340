const inventoryModel = require('../models/inventory-model');
const { buildVehicleDetailHTML } = require('../utilities');

async function vehicleDetail(req, res, next) {
  try {
    const inventory_id = req.params.id;
    const vehicle = await inventoryModel.getVehicleById(inventory_id);

    if (!vehicle) {
      return res.status(404).render('errors/error', {
        title: 'Vehicle Not Found',
        message: 'The requested vehicle does not exist.',
      });
    }

    const detailHTML = buildVehicleDetailHTML(vehicle);
    res.render('inventory/detail', {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleHTML: detailHTML,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { vehicleDetail };