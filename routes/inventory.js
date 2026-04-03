import express from "express";
import { inventoryDetailView } from "../controllers/inventoryController.js";

const router = express.Router();

// Vehicle detail route
router.get("/detail/:id", inventoryDetailView);

export default router;