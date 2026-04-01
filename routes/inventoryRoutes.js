import express from "express";
import { getInventoryDetail, getInventoryByClassification } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/classification/:classification_id", getInventoryByClassification);
router.get("/detail/:inventory_id", getInventoryDetail);

export default router;