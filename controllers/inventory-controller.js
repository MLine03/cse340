const inventoryModel = require('../models/inventory-model');
const { buildVehicleHTML } = require('../utilities/index');

// Show vehicles by classification
async function classificationPage(req, res, next) {
    const classificationId = req.params.id;
    try {
        const vehicles = await inventoryModel.getVehiclesByClassification(classificationId);
        res.render('inventory/classification', { title: 'Vehicles', vehicles });
    } catch (err) {
        next(err);
    }
}

// Show vehicle detail
async function vehicleDetail(req, res, next) {
    const invId = req.params.id;
    try {
        const vehicle = await inventoryModel.getVehicleById(invId);
        if (!vehicle) {
            return res.status(404).render('error', { title: '404', message: 'Vehicle not found' });
        }
        const vehicleHTML = buildVehicleHTML(vehicle);
        res.render('inventory/detail', { title: `${vehicle.make} ${vehicle.model}`, vehicleHTML });
    } catch (err) {
        next(err);
    }
}

module.exports = { classificationPage, vehicleDetail };
