// routes/indexRoute.js

const express = require("express");
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
  res.render("index", {
    title: "CSE Motors | Home" // optional, used in head partial
  });
});

module.exports = router;

