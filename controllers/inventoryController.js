// controllers/inventoryController.js
const inventoryModel = require('../models/inventory-model');
const util = require('../utilities');

// Display all inventory
exports.listInventory = async (req, res, next) => {
  try {
    const inventoryData = await inventoryModel.getAllInventory();
    res.render('inventory/list', {
      title: 'Vehicle Inventory',
      inventory: inventoryData.rows,
    });
  } catch (err) {
    next(err);
  }
};

// Display a single vehicle detail
exports.vehicleDetail = async (req, res, next) => {
  try {
    const inv_id = req.params.inv_id;
    const vehicle = await inventoryModel.getVehicleById(inv_id);

    if (!vehicle.rows[0]) {
      req.flash('info', 'Vehicle not found');
      return res.redirect('/inventory');
    }

    const vehicleHTML = util.buildVehicleDetailHTML(vehicle.rows[0]);

    res.render('inventory/detail', {
      title: `${vehicle.rows[0].inv_make} ${vehicle.rows[0].inv_model}`,
      vehicleHTML,
    });
  } catch (err) {
    next(err);
  }
};