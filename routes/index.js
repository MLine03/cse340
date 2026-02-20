const express = require("express")
const router = express.Router()
const utilities = require("../utilities")

router.get("/", utilities.handleErrors(async (req, res, next) => {
  // Example: render home page with navigation
  res.render("home", { title: "Home" })
}))

module.exports = router