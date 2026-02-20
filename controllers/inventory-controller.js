const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities');

async function buildByInventoryId(req, res) {
  const inv_id = req.params.inv_id;
  const vehicle = await inventoryModel.getVehicleById(inv_id);
  if (!vehicle) {
    return res.status(404).render('errors/404', { title: 'Vehicle Not Found' });
  }
  const html = utilities.buildVehicleDetail(vehicle);
  res.render('inventory/detail', { html });
}

async function triggerError(req, res) {
  throw new Error('This is a test error');
}

module.exports = { buildByInventoryId, triggerError };