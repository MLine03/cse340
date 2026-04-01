// routes/inventoryRoutes.js
import express from "express";
import inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/add-inventory", inventoryController.addInventoryPage);
router.post("/add-inventory", inventoryController.addInventory);

export default router;