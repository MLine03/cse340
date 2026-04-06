require("dotenv").config()   // MUST BE FIRST LINE

const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

/* ------------------ Middleware ------------------ */

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* ------------------ View Engine ------------------ */
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ------------------ Routes ------------------ */
const homeRoute = require("./routes/home")
const inventoryRoutes = require("./routes/inventoryRoute")   // ⭐ FIXED NAME
const accountRoutes = require("./routes/accountRoutes")
const classificationRoutes = require("./routes/classificationRoutes")

app.use("/", homeRoute)
app.use("/inv", inventoryRoutes)
app.use("/account", accountRoutes)
app.use("/classification", classificationRoutes)

/* ------------------ 404 Handler ------------------ */
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "404 Not Found",
    message: "Sorry, we can't find that page."
  })
})

/* ------------------ Global Error Handler ------------------ */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message)
  console.error(err.stack)

  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong. Please try again later."
  })
})

/* ------------------ Start Server ------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})