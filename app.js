// app.js
const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// View engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main") // main.ejs in views/layouts/

// Session and flash
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
)
app.use(flash())

// Flash message middleware for templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

// Routes
const inventoryRoute = require("./routes/inventoryRoute")
app.use("/inventory", inventoryRoute)

// Root route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" })
})

module.exports = app
