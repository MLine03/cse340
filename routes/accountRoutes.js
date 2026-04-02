// routes/accountRoutes.js
import express from "express";
import { body } from "express-validator";
import { handleErrors, checkExistingEmail, registerAccount } from "../utilities/index.js";

const router = express.Router();

router.post(
  "/register",
  body("account_email").isEmail(),
  body("account_password").isLength({ min: 6 }),
  handleErrors(async (req, res) => {
    const exists = await checkExistingEmail(req.body.account_email);
    if (exists) return res.status(400).send("Email already exists");

    const newAccount = await registerAccount(req.body);
    res.status(201).json({ accountId: newAccount.account_id });
  })
);

export default router;