const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

// Build delete confirmation view
async function buildDeleteConfirm(req, res) {
  const inv_id = parseInt(req.params.inv_id);
  const item = await inventoryModel.getInventoryById(inv_id);
  if (!item) {
    return res.redirect("/inv");
  }
  const nav = utilities.getNav();
  res.render("inventory/delete-confirm", {
    title: `Delete ${item.make} ${item.model}`,
    nav,
    errors: null,
    item,
  });
}

// Delete inventory item
async function deleteInventoryItem(req, res) {
  const inv_id = parseInt(req.body.inv_id);
  const deleted = await inventoryModel.deleteInventoryItem(inv_id);
  if (deleted) {
    req.flash("success", "Inventory item deleted successfully!");
    res.redirect("/inv");
  } else {
    req.flash("error", "Failed to delete inventory item.");
    res.redirect(`/inv/delete/${inv_id}`);
  }
}

module.exports = {
  buildDeleteConfirm,
  deleteInventoryItem
};
