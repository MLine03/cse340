require("dotenv").config()

const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

/* -------------------- Middleware -------------------- */
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* -------------------- View Engine -------------------- */
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* -------------------- Routes -------------------- */
const homeRoute = require("./routes/home")
const inventoryRoutes = require("./routes/inventoryRoutes")
const accountRoutes = require("./routes/accountRoutes")

app.use("/", homeRoute)
app.use("/inv", inventoryRoutes)
app.use("/account", accountRoutes)

/* -------------------- 404 Handler -------------------- */
app.use(async (req, res) => {
  res.status(404).render("errors/404", {
    title: "404 Not Found",
    nav: "<ul><li><a href='/'>Home</a></li></ul>"
  })
})

/* -------------------- Global Error Handler -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack)
  res.status(500).send("Server Error")
})

/* -------------------- Start Server -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})