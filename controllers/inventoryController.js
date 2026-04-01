// controllers/inventoryController.js
import { addInventoryItem, getClassifications } from "../models/inventory-model.js";
import { buildClassificationList } from "../utilities/index.js";

export async function viewAddInventory(req, res) {
  const classifications = await getClassifications();
  const classificationList = await buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    errors: null,
    message: req.flash("message"),
    formData: {},
  });
}

export async function processAddInventory(req, res) {
  try {
    const formData = req.body;
    await addInventoryItem(formData);
    req.flash("message", `Inventory item ${formData.inv_make} added successfully!`);
    res.redirect("/inv/");
  } catch (error) {
    console.error(error);
    const classificationList = await buildClassificationList();
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      errors: ["Failed to add inventory item"],
      formData: req.body,
    });
  }
}