const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")

// POST route for adding a review
router.post("/add", reviewController.addReview)

module.exports = router
