import inventoryModel from "../models/inventory-model.js"; // exact file name
import util from "../utilities/index.js"; // if needed

export async function addInventory(req, res, next) {
  const { classification_id, inv_make, inv_model, inv_year } = req.body;
  try {
    const result = await inventoryModel.addInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
    });
    if (result) {
      req.flash("message", "Inventory added successfully!");
      res.redirect("/inv/");
    } else {
      res.render("inventory/add-inventory", {
        errors: [{ msg: "Failed to add inventory" }],
        message: null,
      });
    }
  } catch (error) {
    next(error);
  }
}