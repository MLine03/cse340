/* ************************************
 *  Account routes
 *  Unit 4 & Unit 5 Authentication
 * ************************************/

const express = require("express")
const router = new express.Router()

const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")

/* ************************************
 *  Deliver Login View
 * ************************************ */
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

/* ************************************
 *  Deliver Registration View
 * ************************************ */
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

/* ************************************
 *  Process Registration
 * ************************************ */
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ************************************
 *  Process Login (JWT AUTH)
 * ************************************ */
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

/* ************************************
 *  Account Management Page (after login)
 * ************************************ */
router.get(
  "/",
  utilities.checkJWTToken,
  utilities.handleErrors(accountController.buildAccountManagement)
)

module.exports = router