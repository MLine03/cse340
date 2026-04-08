/* ******************************************
 * Primary server file for the application
 ******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/index")

/* ***********************
 * View Engine And Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(static)

// Home Route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory Routes
app.use("/inv", inventoryRoute)

// 404 Route (must be last)
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/* ***********************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  let message =
    err.status == 404
      ? err.message
      : "Oh no! There was a crash. Maybe try a different route?"

  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  })
})

/* ***********************
 * Server Start (Render + Local Support)
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})