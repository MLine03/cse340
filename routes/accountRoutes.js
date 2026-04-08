const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")

// Login page (GET)
router.get("/login", accountController.buildLogin)

// Login form submission (POST)
router.post("/login", accountController.handleLogin)

module.exports = router