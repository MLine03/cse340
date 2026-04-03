import express from "express";
import { fetchAllVehicles, fetchVehicleById } from "../models/inventoryModel.js";
import { buildVehicleHTML } from "../utilities/index.js";

const router = express.Router();

// Inventory list
router.get("/", async (req, res, next) => {
  try {
    const vehicles = await fetchAllVehicles();
    res.render("inventory/list", { title: "Inventory", vehicles });
  } catch (err) {
    next(err);
  }
});

// Vehicle detail
router.get("/:inv_id", async (req, res, next) => {
  try {
    const vehicle = await fetchVehicleById(req.params.inv_id);
    if (!vehicle) return res.status(404).render("errors/error", { title: "Vehicle Not Found", message: "Vehicle not found" });

    const vehicleHTML = buildVehicleHTML(vehicle);
    res.render("inventory/detail", { title: `${vehicle.make} ${vehicle.model}`, vehicleHTML });
  } catch (err) {
    next(err);
  }
});

export default router;