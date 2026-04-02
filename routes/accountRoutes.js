import express from "express";
import { handleErrors, checkExistingEmail, registerAccount } from "../utilities/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("account");
});

export default router;