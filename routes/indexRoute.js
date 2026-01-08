const express = require("express")
const router = new express.Router()

router.get("/", async (req, res) => {
  res.render("index", {
    title: "CSE Motors | Home"
  })
})

module.exports = router
