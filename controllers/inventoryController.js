import InventoryModel from "../models/inventoryModel.js";
import { wrapVehicleDetail } from "../utilities/index.js";

export const getInventoryByClassification = async (req, res) => {
  const classification_id = req.params.classification_id;
  try {
    const vehicles = await InventoryModel.getByClassification(classification_id);
    res.render("inventory/classification", { vehicles });
  } catch (err) {
    res.status(500).render("error", { message: err.message, status: 500 });
  }
};

export const getInventoryDetail = async (req, res) => {
  const inventory_id = req.params.inventory_id;
  try {
    const vehicle = await InventoryModel.getVehicleById(inventory_id);
    const vehicleHTML = wrapVehicleDetail(vehicle);
    res.render("inventory/detail", { vehicleHTML, vehicle });
  } catch (err) {
    res.status(500).render("error", { message: err.message, status: 500 });
  }
};