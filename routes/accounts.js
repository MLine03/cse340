import express from "express";
import {
  accountManagementView,
  updateAccountView,
  handleAccountUpdate,
  handlePasswordUpdate,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/manage", accountManagementView);
router.get("/update/:id", updateAccountView);
router.post("/update-account", handleAccountUpdate);
router.post("/update-password", handlePasswordUpdate);

export default router;