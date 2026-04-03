import { getVehicleById } from "../models/inventoryModel.js";
import { buildVehicleDetailHTML } from "../utilities/index.js";

// Controller function for vehicle detail view
export const vehicleDetailView = async (req, res, next) => {
  try {
    const inv_id = req.params.inv_id;
    const vehicle = await getVehicleById(inv_id);

    if (!vehicle) {
      return res.status(404).render("errors/error", { title: "Vehicle Not Found", message: "Vehicle not found." });
    }

    const vehicleHTML = buildVehicleDetailHTML(vehicle);

    res.render("inventory/vehicle-detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleHTML,
    });
  } catch (error) {
    next(error); // Pass to error-handling middleware
  }
};