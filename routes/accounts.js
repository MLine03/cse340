import express from "express";
import {
  accountManagementView,
  updateAccountView,
  handleAccountUpdate,
  handlePasswordUpdate
} from "../controllers/accountController.js";

const router = express.Router();

// Account management routes
router.get("/", accountManagementView);
router.get("/update/:id", updateAccountView);
router.post("/update", handleAccountUpdate);
router.post("/update/password", handlePasswordUpdate);

export default router;