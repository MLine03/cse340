import express from "express";
import { getVehicleById } from "../models/inventory-model.js";
import { buildVehicleDetailHTML } from "../utils/index.js";

const router = express.Router();

router.get("/detail/:inv_id", async (req, res, next) => {
  try {
    const vehicle = await getVehicleById(req.params.inv_id);
    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "The requested vehicle does not exist.",
      });
    }

    const htmlContent = buildVehicleDetailHTML(vehicle);
    res.render("inventory/detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      content: htmlContent,
    });
  } catch (error) {
    next(error);
  }
});

export default router;