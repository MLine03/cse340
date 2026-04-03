require("dotenv").config()   // ⭐ MUST BE FIRST LINE

const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// View engine
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

// Routes
const homeRoute = require("./routes/home")
const inventoryRoutes = require("./routes/inventoryRoutes")
const accountRoutes = require("./routes/accountRoutes")
const classificationRoutes = require("./routes/classificationRoutes")

app.use("/", homeRoute)
app.use("/inv", inventoryRoutes)
app.use("/account", accountRoutes)
app.use("/classification", classificationRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found")
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message)
  console.error(err.stack)
  res.status(500).send("Server error occurred")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})