const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const flash = require("connect-flash")

const utilities = require("./utilities")

// Routes
const accountRoute = require("./routes/accountRoute")
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")

const app = express()

/* ***********************
 * Middleware
 ************************ */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
)

app.use(flash())

/* ***********************
 * View Engine
 ************************ */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* ***********************
 * Routes
 ************************ */
app.use("/account", accountRoute)
app.use("/inventory", inventoryRoute)
app.use("/", errorRoute)

/* ***********************
 * Home Route
 ************************ */
app.get("/", utilities.handleErrors(async (req, res) => {
  const nav = await utilities.getNav()
  res.render("index", {
    title: "Home",
    nav,
  })
}))

/* ***********************
 * 404 Handler
 ************************ */
app.use(async (req, res, next) => {
  const nav = await utilities.getNav()
  res.status(404).render("errors/error", {
    title: "404 Not Found",
    nav,
    message: "Sorry, the page you requested does not exist.",
  })
})

/* ***********************
 * Global Error Handler
 ************************ */
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav()
  console.error(err.stack)
  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    nav,
    message: err.message,
  })
})

/* ***********************
 * Server
 ************************ */
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
