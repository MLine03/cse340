/* *****************************
 * Require Statements
 * ***************************** */
const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
const utilities = require("./utilities")
require("dotenv").config()

/* *****************************
 * Middleware
 * ***************************** */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(utilities.checkJWTToken)

/* *****************************
 * Routes
 * ***************************** */
const accountRoute = require("./routes/accountRoute")
app.use("/account", accountRoute)

/* *****************************
 * Server
 * ***************************** */
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
