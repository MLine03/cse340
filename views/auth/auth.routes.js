const express = require("express")
const router = express.Router()

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" })
})

router.post("/login", (req, res) => {
  const { username, password } = req.body
  // Dummy authentication
  if (username === "admin" && password === "password") {
    req.flash("message", "Login successful!")
    res.redirect("/inv")
  } else {
    req.flash("message", "Invalid login.")
    res.redirect("/auth/login")
  }
})

module.exports = router
