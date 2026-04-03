import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Vehicle Inventory",
    nav: "<nav><a href='/'>Home</a> | <a href='/accounts'>Account</a> | <a href='/inventory'>Inventory</a></nav>"
  });
});

export default router;