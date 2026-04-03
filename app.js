// ==============================
// REQUIRE PACKAGES
// ==============================
const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()

// ==============================
// ROUTES
// ==============================
const inventoryRoute = require("./routes/inventoryRoute")

// ==============================
// VIEW ENGINE SETUP
// ==============================
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

// ==============================
// MIDDLEWARE
// ==============================
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")))

// ==============================
// NAVIGATION (if your project uses it)
// ==============================
const utilities = require("./utilities")

app.use(async (req, res, next) => {
  res.locals.nav = await utilities.getNav()
  next()
})

// ==============================
// HOME ROUTE
// ==============================
app.get("/", async (req, res) => {
  res.render("index", { title: "Home" })
})

// ==============================
// INVENTORY ROUTES
// ==============================
app.use("/inv", inventoryRoute)

// ==============================
// 404 ERROR HANDLER
// ==============================
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "404 - Page Not Found"
  })
})

// ==============================
// 500 ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message)

  res.status(500).render("errors/error", {
    title: "500 - Server Error"
  })
})

// ==============================
// SERVER LISTENER
// ==============================
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})