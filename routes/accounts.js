import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("accounts/account", { title: "Account Management" });
});

export default router;