// routes/accountRoutes.js
import express from "express";
import { register } from "../controllers/accountController.js";

const router = express.Router();

router.get("/register", (req, res) => res.render("account/register"));
router.post("/register", register);

export default router;