import express from "express";
import {
  accountManagementView,
  updateAccountView,
  handleAccountUpdate,
  handlePasswordUpdate,
} from "../controllers/accountController.js";

const router = express.Router();

// Account management page
router.get("/manage", accountManagementView);

// Update account form page
router.get("/update/:id", updateAccountView);

// Handle account info update
router.post("/update", handleAccountUpdate);

// Handle password update
router.post("/update-password", handlePasswordUpdate);

export default router;