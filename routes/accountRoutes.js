import express from "express";
import { registerAccount } from "../controllers/accountController.js";
const router = express.Router();

router.get("/register", (req, res) => res.render("account/register"));
router.post("/register", registerAccount);

export default router;