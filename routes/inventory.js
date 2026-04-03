import express from "express";
import { getInventoryDetail } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/:inv_id", getInventoryDetail);

export default router;