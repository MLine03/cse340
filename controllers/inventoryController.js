// Correct import for the model
import inventoryModel from "../models/inventoryModel.js";
import util from "../utilities/index.js"; // your helper functions
import { validationResult } from "express-validator";

// Example function: show inventory management page
export async function buildManagementView(req, res, next) {
  try {
    const classificationList = await util.buildClassificationList();
    res.render("inventory/management", {
      title: "Inventory Management",
      classificationList,
      errors: null,
      message: req.flash("message"),
    });
  } catch (error) {
    next(error);
  }
}

// Example function: add inventory
export async function addInventory(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const classificationList = await util.buildClassificationList();
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      errors: errors.array(),
      message: null,
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color,
    });
  }

  try {
    const result = await inventoryModel.addInventory(req.body);
    if (result) {
      req.flash("message", `Successfully added inventory: ${req.body.inv_make} ${req.body.inv_model}`);
      res.redirect("/inv/");
    } else {
      throw new Error("Inventory insertion failed");
    }
  } catch (error) {
    next(error);
  }
}