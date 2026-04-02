// routes/inventoryRoutes.js

import express from "express";
const router = express.Router();

import inventoryController from "../controllers/inventoryController.js";
import * as utilities from "../utilities/index.js";

// Management view
router.get("/", utilities.handleErrors(inventoryController.managementView));

// Add inventory view
router.get(
  "/add-inventory",
  utilities.handleErrors(inventoryController.addInventoryView)
);

// Process add inventory
router.post(
  "/add-inventory",
  utilities.handleErrors(inventoryController.addInventory)
);

export default router;