const express = require("express")
const router = express.Router()

router.get("/trigger", (req, res, next) => {
  const err = new Error("Intentional 500 error")
  err.status = 500
  next(err)
})

module.exports = router