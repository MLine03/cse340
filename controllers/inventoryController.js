const invModel = require('../models/inventory-model');
const util = require('../utilities');

module.exports = {

    buildDetailView: async (req, res, next) => {
        const inv_id = req.params.inv_id;
        try {
            const vehicle = await invModel.getVehicleById(inv_id);
            if (!vehicle) {
                return res.status(404).render('errors/404');
            }
            const vehicleHTML = util.buildVehicleDetailHTML(vehicle);
            res.render('inventory/detail', { vehicleHTML, title: `${vehicle.inv_make} ${vehicle.inv_model}` });
        } catch (error) {
            next(error);
        }
    },

    managementView: (req, res) => {
        const message = req.flash('message');
        res.render('inventory/management', { title: 'Inventory Management', message });
    },

    addClassificationView: (req, res) => {
        const message = req.flash('message');
        res.render('inventory/add-classification', { title: 'Add Classification', message });
    },

    addClassification: async (req, res, next) => {
        const { classification_name } = req.body;
        try {
            if (!classification_name || /\W/.test(classification_name)) {
                req.flash('message', 'Invalid classification name. No spaces or special characters allowed.');
                return res.redirect('/inv/add-classification');
            }
            await invModel.addClassification(classification_name);
            req.flash('message', 'Classification added successfully!');
            res.redirect('/inv/');
        } catch (error) {
            next(error);
        }
    },

    addInventoryView: async (req, res, next) => {
        try {
            const classificationList = await util.buildClassificationList();
            const message = req.flash('message');
            res.render('inventory/add-inventory', { title: 'Add Inventory', classificationList, message, sticky: {} });
        } catch (error) {
            next(error);
        }
    },

    addInventory: async (req, res, next) => {
        const vehicle = req.body;
        try {
            // server-side validation
            if (!vehicle.inv_make || !vehicle.inv_model || !vehicle.inv_year || !vehicle.inv_price) {
                req.flash('message', 'Please fill in all required fields.');
                return res.render('inventory/add-inventory', {
                    title: 'Add Inventory',
                    classificationList: await util.buildClassificationList(vehicle.classification_id),
                    message: req.flash('message'),
                    sticky: vehicle
                });
            }

            // set default images if empty
            vehicle.inv_image = vehicle.inv_image || '/images/no-image.png';
            vehicle.inv_thumbnail = vehicle.inv_thumbnail || '/images/no-image.png';

            await invModel.addInventory(vehicle);
            req.flash('message', 'Inventory item added successfully!');
            res.redirect('/inv/');
        } catch (error) {
            next(error);
        }
    },

    triggerError: (req, res, next) => {
        const err = new Error('Intentional server error!');
        err.status = 500;
        next(err);
    }
};