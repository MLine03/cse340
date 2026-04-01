// controllers/inventoryController.js
import inventoryModel from "../models/inventory-model.js"; // FIXED: exact file name
import util from "../utilities/index.js";

export async function addInventoryView(req, res) {
  try {
    const classificationList = await util.buildClassificationList();
    res.render("inventory/add-inventory", { classificationList, errors: null });
  } catch (error) {
    console.error(error);
    req.flash("error", "Error loading inventory form");
    res.redirect("/inv");
  }
}

export async function insertInventory(req, res) {
  const { inv_make, inv_model, inv_year, classification_id } = req.body;

  // Example server-side validation
  const errors = [];
  if (!inv_make) errors.push("Make is required");
  if (!inv_model) errors.push("Model is required");

  if (errors.length > 0) {
    const classificationList = await util.buildClassificationList(classification_id);
    return res.render("inventory/add-inventory", { classificationList, errors });
  }

  try {
    const result = await inventoryModel.addInventory(req.body);
    req.flash("success", "Inventory item added successfully!");
    res.redirect("/inv");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to add inventory item");
    res.redirect("/inv");
  }
}