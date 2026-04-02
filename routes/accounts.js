import express from "express";
import * as accountController from "../controllers/accountController.js";
import { checkJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware ensures user is logged in
router.use(checkJWT);

// Account management
router.get("/manage", accountController.manageAccount);

// Update account
router.get("/update/:id", accountController.showUpdateForm);
router.post("/update", accountController.updateAccount);

// Change password
router.post("/password", accountController.changePassword);

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

export default router;