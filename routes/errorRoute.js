const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")

router.get(
  "/trigger-error",
  utilities.handleErrors(async (req, res) => {
    throw new Error("Intentional Server Error")
  })
)

module.exports = router
