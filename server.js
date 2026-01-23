const express = require("express")
const app = express()
const utilities = require("./utilities")

/* *************** Middleware **************** */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

/* *************** View Engine **************** */
app.set("view engine", "ejs")

/* *************** Routes **************** */
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")

app.use("/inv", inventoryRoute)
app.use("/", errorRoute)

/* *************** 404 Handler **************** */
app.use(async (req, res) => {
  const nav = "" // optional nav
  res.status(404).render("errors/error", {
    title: "Page Not Found",
    nav,
    message: "Sorry, the page you requested does not exist.",
  })
})

/* *************** 500 Error Handler **************** */
app.use(async (err, req, res, next) => {
  const nav = "" // optional nav
  console.error(err.message)
  res.status(500).render("errors/error", {
    title: "Server Error",
    nav,
    message: err.message,
  })
})

/* *************** Server **************** */
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
