import express from "express";
import { vehicleDetailView } from "../controllers/inventoryController.js";
const router = express.Router();

// Vehicle detail route
router.get("/detail/:id", vehicleDetailView);

export default router;