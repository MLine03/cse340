import express from "express";
import { getAccount, updateAccount } from "../controllers/accountController.js";

const router = express.Router();

router.get("/", getAccount);
router.post("/update", updateAccount);

export default router;