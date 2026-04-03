const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

/* ******************************
 * Static Files
 ******************************/
app.use(express.static(path.join(__dirname, "public")))

/* ******************************
 * View Engine
 ******************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ******************************
 * Routes
 ******************************/
app.use("/", require("./routes/home"))
app.use("/inv", require("./routes/inventoryRoutes"))
app.use("/account", require("./routes/accountRoutes"))
app.use("/classification", require("./routes/classificationRoutes"))

/* ******************************
 * 404 Error Handler
 ******************************/
app.use((req, res, next) => {
  const err = new Error("Sorry, page not found.")
  err.status = 404
  next(err)
})

/* ******************************
 * Global Error Handler (REQUIRED)
 ******************************/
app.use((err, req, res, next) => {
  console.error(err.stack)

  const status = err.status || 500
  const message = status === 404
    ? "Page Not Found"
    : "Internal Server Error"

  res.status(status).render("errors/error", {
    title: status,
    message: message
  })
})

/* ******************************
 * Start Server
 ******************************/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})