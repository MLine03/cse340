import { getVehicleById } from "../models/inventoryModel.js";
import { buildVehicleDetailHTML } from "../utilities/index.js";

export const inventoryDetailView = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await getVehicleById(vehicleId);
    if (!vehicle) {
      return res.status(404).render("errors/error", { title: "Not Found", message: "Vehicle not found" });
    }
    const vehicleHTML = buildVehicleDetailHTML(vehicle);
    res.render("inventory/detail", { title: `${vehicle.make} ${vehicle.model}`, vehicleHTML });
  } catch (error) {
    next(error);
  }
};