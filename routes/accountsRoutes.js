import express from "express"
import accountController from "../controllers/accountController.js"

const router = express.Router()

router.get("/", accountController.buildAccount)
router.get("/update/:account_id", accountController.buildUpdate)

router.post("/update", accountController.updateAccount)
router.post("/password", accountController.updatePassword)

router.get("/logout", accountController.logout)

export default router