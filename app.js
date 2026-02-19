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

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
)

app.use(flash())

// Flash locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

// Routes
const inventoryRoute = require("./routes/inventoryRoute")
app.use("/inv", inventoryRoute)

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

/* 404 Handler */
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

/* 500 Handler (MUST BE LAST) */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render("errors/error", {
    title: err.status || "Server Error",
    message: err.message,
  })
})

module.exports = app