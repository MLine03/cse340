const express = require("express")
const router = express.Router()
const utilities = require("../utilities")

router.get(
  "*",
  utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.status(404).render("errors/error", {
      title: "404 Not Found",
      nav,
      message: "Sorry, the page you requested does not exist.",
    })
  })
)

module.exports = router
