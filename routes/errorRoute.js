const express = require("express")
const router = express.Router()

router.get("/trigger-error", (req, res, next) => {
  try {
    throw new Error("Intentional 500 error for testing")
  } catch (err) {
    next(err)
  }
})

module.exports = router
