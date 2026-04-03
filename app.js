const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const utilities = require("./utilities")

const homeRoute = require("./routes/home")
const inventoryRoutes = require("./routes/inventoryRoutes")
const accountRoutes = require("./routes/accountRoutes")
const classificationRoutes = require("./routes/classificationRoutes")

const app = express()
const PORT = process.env.PORT || 3000

// ---------- STATIC FILES ----------
app.use(express.static(path.join(__dirname, "public")))

// ---------- VIEW ENGINE ----------
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

// ---------- GLOBAL NAV (CSE340 REQUIRED) ----------
app.use(async (req, res, next) => {
  try {
    res.locals.nav = await utilities.getNav()
    next()
  } catch (error) {
    next(error)
  }
})

// ---------- ROUTES ----------
app.use("/", homeRoute)
app.use("/inv", inventoryRoutes)
app.use("/account", accountRoutes)
app.use("/classification", classificationRoutes)

// ---------- 404 HANDLER ----------
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

// ---------- GLOBAL ERROR HANDLER (TASK 2 + 3) ----------
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).render("errors/error", {
    title: "Server Error",
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.set// View engine (FIX FOR RENDER)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(expressLayouts)
app.set("layout", "layouts/layout")