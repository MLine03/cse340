const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const flash = require("connect-flash")

const utilities = require("./utilities")

// Routes
const accountRoute = require("./routes/accountRoute")
const inventoryRoute = require("./routes/inventory-routes")

const app = express()

/* ─────────────────────────────
 * Middleware
 * ───────────────────────────── */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

/* ─────────────────────────────
 * Session & Flash
 * ───────────────────────────── */
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
)

app.use(flash())

/* Make nav + flash available globally */
app.use(async (req, res, next) => {
  res.locals.nav = await utilities.getNav()
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

/* ─────────────────────────────
 * View Engine
 * ───────────────────────────── */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* ─────────────────────────────
 * Routes
 * ───────────────────────────── */
app.get(
  "/",
  utilities.handleErrors(async (req, res) => {
    res.render("index", { title: "Home" })
  })
)

app.use("/account", accountRoute)
app.use("/inventory", inventoryRoute)

/* ─────────────────────────────
 * 404 Handler
 * ───────────────────────────── */
app.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "Page Not Found",
  })
})

/* ─────────────────────────────
 * Global Error Handler
 * ───────────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    message: err.message || "Something went wrong",
  })
})

/* ─────────────────────────────
 * Start Server
 * ───────────────────────────── */
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
en(PORT, () => console.log(`Server running on port ${PORT}`));
