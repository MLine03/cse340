// routes/inventoryRoutes.js
import express from "express";
const router = express.Router();

import inventoryController from "../controllers/inventoryController.js";
import { handleErrors } from "../utilities/index.js";

router.get("/", handleErrors(inventoryController.managementView));
router.get("/add-inventory", handleErrors(inventoryController.addInventoryView));
router.post("/add-inventory", handleErrors(inventoryController.addInventory));

export default router;