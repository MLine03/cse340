const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Classification view
// URL example: /inv/type/1
router.get("/type/:classificationId", invController.buildByClassificationId)

// Vehicle detail view
// URL example: /inv/detail/3
router.get("/detail/:id", invController.buildDetail)

module.exports = router