const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const { validationResult } = require("express-validator");

// Management view
async function buildManagement(req, res) {
  const nav = await utilities.getNav();
  res.render("inventory/management", { title: "Inventory Management", nav, message: req.flash("message") });
}

// Add classification view
async function buildAddClassification(req, res) {
  const nav = await utilities.getNav();
  res.render("inventory/add-classification", { title: "Add Classification", nav, errors: null });
}

// Process classification
async function addClassification(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    return res.render("inventory/add-classification", { title: "Add Classification", nav, errors: errors.array() });
  }

  try {
    await invModel.addClassification(req.body.classification_name);
    req.flash("message", `Classification ${req.body.classification_name} added successfully!`);
    res.redirect("/inv");
  } catch (err) {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", { title: "Add Classification", nav, errors: [{ msg: "Failed to add classification." }] });
  }
}

// Add inventory view
async function buildAddInventory(req, res) {
  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", { title: "Add Inventory", nav, classificationList, errors: null, data: {} });
}

// Process inventory
async function addInventory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList(req.body.classification_id);
    return res.render("inventory/add-inventory", { title: "Add Inventory", nav, classificationList, errors: errors.array(), data: req.body });
  }

  try {
    await invModel.addInventory(req.body);
    req.flash("message", `Inventory item ${req.body.inv_make} ${req.body.inv_model} added successfully!`);
    res.redirect("/inv");
  } catch (err) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList(req.body.classification_id);
    res.render("inventory/add-inventory", { title: "Add Inventory", nav, classificationList, errors: [{ msg: "Failed to add inventory." }], data: req.body });
  }
}

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
};
