// controllers/inventoryController.js
const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

// Show all inventory
async function showInventory(req, res, next) {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.render("inventory/list", { title: "Inventory", inventory });
  } catch (error) {
    next(error);
  }
}

// Vehicle detail page
async function getInventoryDetail(req, res, next) {
  try {
    const inv_id = req.params.id; // MUST match router :id
    const vehicle = await inventoryModel.getInventoryById(inv_id);

    if (!vehicle) {
      const err = new Error("Vehicle not found");
      err.status = 404;
      throw err;
    }

    const detailHTML = await utilities.buildVehicleDetail(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      detailHTML,
    });
  } catch (error) {
    next(error);
  }
}

// Show add classification page
function showAddClassification(req, res) {
  res.render("inventory/add-classification", { title: "Add Classification" });
}

// Add classification
async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body;
    await inventoryModel.addClassification(classification_name);
    res.redirect("/inventory");
  } catch (error) {
    next(error);
  }
}

// Show add inventory page
function showAddInventory(req, res) {
  res.render("inventory/add-inventory", { title: "Add Inventory" });
}

// Add inventory
async function addInventory(req, res, next) {
  try {
    const newInventory = req.body;
    await inventoryModel.addInventory(newInventory);
    res.redirect("/inventory");
  } catch (error) {
    next(error);
  }
}

// Intentional 500 error
async function triggerError(req, res, next) {
  throw new Error("Intentional 500 error");
}

module.exports = {
  showInventory,
  getInventoryDetail,
  showAddClassification,
  addClassification,
  showAddInventory,
  addInventory,
  triggerError,
};