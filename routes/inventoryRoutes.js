const express = require("express")
const router = new express.Router()

const invController = require("../controllers/invController")

/* ***************************
 * Route to build inventory by classification
 * URL example: /inv/type/1
 * *************************** */
router.get("/type/:classificationId", invController.buildByClassificationId)

/* ***************************
 * Route to build vehicle detail page
 * URL example: /inv/detail/5
 * *************************** */
router.get("/detail/:id", invController.buildDetail)

module.exports = router