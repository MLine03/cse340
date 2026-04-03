import express from "express";
import { vehicleDetailView } from "../controllers/inventoryController.js";
const router = express.Router();

// Route for vehicle detail page
router.get("/detail/:inv_id", vehicleDetailView);

export default router;