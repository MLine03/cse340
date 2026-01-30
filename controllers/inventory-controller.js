// controllers/inventory-controller.js
const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities/index');

// Classification page
async function classificationPage(req, res, next) {
    const classificationId = req.params.id;
    try {
        const vehicles = await inventoryModel.getVehiclesByClassification(classificationId);
        res.render('inventory/classification', { title: 'Vehicles by Classification', vehicles });
    } catch (err) {
        next(err); // send to 500 error handler
    }
}

// Vehicle detail page
async function vehicleDetail(req, res, next) {
    const vehicleId = req.params.id;
    try {
        const vehicle = await inventoryModel.getVehicleById(vehicleId);
        if (!vehicle) {
            return res.status(404).render('error', { title: '404', message: 'Vehicle Not Found' });
        }
        const vehicleHtml = utilities.buildVehicleDetailHtml(vehicle);
        res.render('inventory/vehicle-detail', { title: `${vehicle.make} ${vehicle.model}`, vehicleHtml });
    } catch (err) {
        next(err); // send to 500 error handler
    }
}

module.exports = {
    classificationPage,
    vehicleDetail,
};
