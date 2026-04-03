// routes/inventory.js
import express from "express";
import { getVehicleById } from "../models/inventory-model.js";
import { buildVehicleDetailHTML } from "../utils/index.js";

const router = express.Router();

router.get("/detail/:inv_id", async (req, res, next) => {
  try {
    const vehicle = await getVehicleById(req.params.inv_id);
    const vehicleHTML = buildVehicleDetailHTML(vehicle);
    res.render("inventory/detail", { title: `${vehicle?.inv_make} ${vehicle?.inv_model}`, vehicleHTML });
  } catch (error) {
    next(error);
  }
});

export default router;