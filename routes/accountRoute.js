const express = require("express")
const router = express.Router()
const utilities = require("../utilities")

router.get(
  "/",
  utilities.handleErrors(async (req, res) => {
    res.render("index", {
      title: "Account Page",
    })
  })
)

router.post(
  "/login",
  utilities.handleErrors(async (req, res) => {
    req.flash("success", "Logged in successfully!")
    res.redirect("/")
  })
)

module.exports = router
