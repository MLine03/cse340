import express from "express"
import invController from "../controllers/inventoryController.js"

const router = express.Router()

router.get("/", invController.managementView)

router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", invController.addClassification)

router.get("/add-inventory", invController.buildAddInventory)
router.post("/add-inventory", invController.addInventory)

// Assignment 3 DETAIL VIEW
router.get("/detail/:inv_id", invController.buildDetail)

// 500 ERROR TEST
router.get("/error", (req, res, next) => {
  next(new Error("Intentional 500 error"))
})

export default router