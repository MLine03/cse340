// routes/accounts.js
import express from "express";
import {
  accountManagementView,
  updateAccountView,
  handleAccountUpdate,
  handlePasswordUpdate,
  logout,
} from "../controllers/accountController.js";

const router = express.Router();

// Account management page
router.get("/management", accountManagementView);

// Update account view
router.get("/update/:id", updateAccountView);

// Handle account info update
router.post("/update", handleAccountUpdate);

// Handle password change
router.post("/update-password", handlePasswordUpdate);

// Logout
router.get("/logout", logout);

export default router;