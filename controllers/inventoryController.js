const inventoryModel = require('../models/inventoryModel');
const util = require('../utils/index');

// --- Management View ---
exports.showManagementPage = (req, res) => {
    const message = req.flash('message');
    res.render('inventory/management', { message });
};

// --- Add Classification ---
exports.showAddClassificationForm = (req, res) => {
    const errors = req.flash('errors');
    const oldInput = req.flash('oldInput')[0] || {};
    res.render('inventory/add-classification', { errors, oldInput });
};

exports.addClassification = async (req, res) => {
    const { classification_name } = req.body;
    try {
        await inventoryModel.addClassification(classification_name);
        req.flash('message', 'Classification added successfully.');
        res.redirect('/inv/');
    } catch (error) {
        req.flash('errors', ['Failed to add classification.']);
        req.flash('oldInput', { classification_name });
        res.redirect('/inv/add-classification');
    }
};

// --- Add Inventory ---
exports.showAddInventoryForm = async (req, res) => {
    const classificationList = await util.buildClassificationList();
    const errors = req.flash('errors');
    const oldInput = req.flash('oldInput')[0] || {};
    res.render('inventory/add-inventory', { classificationList, errors, oldInput });
};

exports.addInventory = async (req, res) => {
    const itemData = req.body;
    try {
        await inventoryModel.addInventory(itemData);
        req.flash('message', 'Inventory item added successfully.');
        res.redirect('/inv/');
    } catch (error) {
        req.flash('errors', ['Failed to add inventory item.']);
        req.flash('oldInput', itemData);
        res.redirect('/inv/add-inventory');
    }
};

// --- Vehicle Detail ---
exports.showInventoryDetail = async (req, res, next) => {
    const inv_id = req.params.inv_id;
    try {
        const vehicle = await inventoryModel.getInventoryById(inv_id);
        if (!vehicle) return next(); // 404 if not found
        const detailHTML = util.buildVehicleDetailHTML(vehicle);
        res.render('inventory/detail', { vehicle, detailHTML });
    } catch (error) {
        next(error); // send to error handler
    }
};

// --- Trigger 500 Error ---
exports.triggerError = (req, res, next) => {
    const error = new Error('Intentional Server Error');
    error.status = 500;
    next(error);
};