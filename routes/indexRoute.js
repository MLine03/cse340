const express = require("express")
const router = new express.Router()

router.get("/", (req, res) => {
  res.send("<h1>Welcome to CSE Motors!</h1><p>Try <a href='/inv/type/1'>Vehicles Type 1</a></p>")
})

module.exports = router
