import { fetchVehicleById } from "../models/inventoryModel.js";
import { buildVehicleHTML } from "../utilities/index.js";

export async function getInventoryDetail(req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const vehicle = await fetchVehicleById(inv_id);

    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "Vehicle not found",
      });
    }

    const vehicleHTML = buildVehicleHTML(vehicle);
    res.render("inventory/detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleHTML,
    });
  } catch (err) {
    next(err);
  }
}