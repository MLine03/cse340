import express from "express";
import { handleErrors, getInventory } from "../utilities/index.js";

const router = express.Router();

router.get("/", handleErrors(async (req, res) => {
  const inventory = await getInventory();
  res.render("inventory", { inventory });
}));

export default router;