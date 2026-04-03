import express from "express";
import { vehicleDetailView } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/detail/:id", vehicleDetailView);

export default router;