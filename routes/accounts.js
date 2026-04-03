import express from "express";
import { loginView, handleLogin } from "../controllers/authController.js";
import { accountManagementView } from "../controllers/accountController.js";

const router = express.Router();

// Login routes
router.get("/login", loginView);
router.post("/login", handleLogin);

// Account management (example)
router.get("/manage", accountManagementView);

export default router;