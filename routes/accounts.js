import express from "express";
const router = express.Router();
import {
  accountManagementView,
  updateAccountView,
  handleAccountUpdate,
  handlePasswordUpdate,
} from "../controllers/accountController.js";

router.get("/management", accountManagementView);
router.get("/update/:id", updateAccountView);
router.post("/update", handleAccountUpdate);
router.post("/password", handlePasswordUpdate);

export default router;