const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

// Controllers & Utilities
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/index")

// Routes
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")
const accountRoutes = require("./routes/accountRoutes")

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "./layouts/layout")

// Static routes
app.use(staticRoutes)

// Home route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoutes)

// Account routes
app.use("/account", accountRoutes)

// 404 handler
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

// Error handler
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  const message =
    err.status === 404
      ? err.message
      : "Oh no! There was a crash. Maybe try a different route?"

  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  })
})

const port = process.env.PORT || 5500
const host = process.env.HOST || "0.0.0.0"
app.listen(port, host, () => {
  console.log(`app listening on ${host}:${port}`)
})