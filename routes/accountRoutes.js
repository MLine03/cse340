// controllers/inventoryController.js
import invModel from "../models/inventoryModel.js";
import { validationResult } from "express-validator";
import express from "express";
import utilities from "../utilities/index.js";

const inventoryController = {};

// Add inventory page
inventoryController.addInventoryPage = async (req, res) => {
  let classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    classificationList,
    title: "Add Inventory",
  });
};

// Add inventory handler
inventoryController.addInventory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let classificationList = await utilities.buildClassificationList(req.body.classification_id);
    return res.render("inventory/add-inventory", {
      classificationList,
      errors: errors.array(),
      data: req.body,
    });
  }

  try {
    const result = await invModel.addInventory(req.body);
    if (result.rowCount === 1) {
      req.flash("success", "Inventory item added successfully");
      return res.redirect("/inv/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Server error" });
  }
};

export default inventoryController;