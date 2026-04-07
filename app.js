require("dotenv").config()

const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* ---------------- VIEW ENGINE ---------------- */
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ---------------- ROUTES ---------------- */
const homeRoute = require("./routes/home")
const inventoryRoute = require("./routes/inventoryRoute")   // ⭐ singular
const accountRoutes = require("./routes/accountRoutes")
const classificationRoutes = require("./routes/classificationRoutes")

app.use("/", homeRoute)
app.use("/inv", inventoryRoute)
app.use("/account", accountRoutes)
app.use("/classification", classificationRoutes)

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "404 Not Found",
    message: "Sorry, we couldn't find that page.",
    nav: "",
  })
})

/* ---------------- GLOBAL ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message)
  console.error(err.stack)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong. Please try again later.",
    nav: "",
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))