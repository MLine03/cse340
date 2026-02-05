const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const { body, validationResult } = require("express-validator");

// Management View
exports.buildManagement = async (req, res) => {
  const classifications = await invModel.getClassifications();
  res.render("inventory/management", {
    title: "Inventory Management",
    nav: await utilities.getNav(),
    classifications,
    errors: [],
    success: req.flash("success") || [],
  });
};

// Add Classification View
exports.buildAddClassification = async (req, res) => {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav: await utilities.getNav(),
    errors: [],
    success: [],
  });
};

// Add Classification POST
exports.addClassification = async (req, res) => {
  const { classification_name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav: await utilities.getNav(),
      errors: errors.array().map(e => e.msg),
      success: [],
    });
  }

  const result = await invModel.addClassification(classification_name);
  if (result) {
    req.flash("success", `Classification '${classification_name}' added successfully.`);
    res.redirect("/inv");
  } else {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav: await utilities.getNav(),
      errors: ["Failed to add classification."],
      success: [],
    });
  }
};

// Add Vehicle View
exports.buildAddVehicle = async (req, res) => {
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-vehicle", {
    title: "Add Vehicle",
    nav: await utilities.getNav(),
    classificationList,
    errors: [],
    success: [],
    sticky: {},
  });
};

// Add Vehicle POST
exports.addVehicle = async (req, res) => {
  const sticky = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const classificationList = await utilities.buildClassificationList(sticky.classification_id);
    return res.render("inventory/add-vehicle", {
      title: "Add Vehicle",
      nav: await utilities.getNav(),
      classificationList,
      errors: errors.array().map(e => e.msg),
      success: [],
      sticky,
    });
  }

  const result = await invModel.addVehicle(req.body);
  if (result) {
    req.flash("success", `Vehicle '${req.body.inv_make} ${req.body.inv_model}' added successfully.`);
    res.redirect("/inv");
  } else {
    const classificationList = await utilities.buildClassificationList(sticky.classification_id);
    res.render("inventory/add-vehicle", {
      title: "Add Vehicle",
      nav: await utilities.getNav(),
      classificationList,
      errors: ["Failed to add vehicle."],
      success: [],
      sticky,
    });
  }
};
