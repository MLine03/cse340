const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
const inventoryRoute = require("./routes/inventoryRoute")

const app = express()

// Set EJS as view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Parse incoming requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session and flash
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
)
app.use(flash())

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

// Routes
app.use("/inv", inventoryRoute)

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found")
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send("Server error")
})

module.exports = app

