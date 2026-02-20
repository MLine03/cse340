const invModel = require('../models/inventory-model')
const utilities = require('../utilities')

// Show vehicle detail
async function buildByInventoryId(req, res, next) {
  const inv_id = req.params.inv_id
  const vehicle = await invModel.getInventoryById(inv_id)
  if (!vehicle) {
    return res.status(404).render('errors/404', { title: 'Not Found' })
  }
  const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle)
  res.render('inventory/detail', { title: `${vehicle.inv_make} ${vehicle.inv_model}`, vehicleHTML })
}

// Trigger 500 error (for footer link)
async function triggerError(req, res, next) {
  throw new Error('Intentional 500 error for testing')
}

module.exports = { buildByInventoryId, triggerError }