import express from "express";
import { getInventory, getInventoryDetail } from "../utils/index.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const inventoryHTML = await getInventory();
    res.render("inventory/inventory", { title: "Inventory", inventoryHTML });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const vehicleDetailHTML = await getInventoryDetail(req.params.id);
    res.render("inventory/detail", { title: "Vehicle Detail", vehicleDetailHTML });
  } catch (err) {
    next(err);
  }
});

export default router;