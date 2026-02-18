// routes/auth.js
const express = require("express")
const router = express.Router()

// Show login form
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" })
})

// Handle login submission
router.post("/login", (req, res) => {
  // For demo purposes, login always succeeds
  req.session.loggedIn = true
  req.flash("message", "You are now logged in!")
  res.redirect("/")
})

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err)
    res.redirect("/")
  })
})

module.exports = router
