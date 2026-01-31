const express = require("express")
const router = express.Router()
const utilities = require("../utilities")

router.get(
  "/",
  utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.render("index", { title: "Account Page", nav })
  })
)

module.exports = router
