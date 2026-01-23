const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <p>Visit /inv/detail/1 or /inv/detail/2</p>
  `)
})

module.exports = router
