require("dotenv").config()

const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

// ⭐ IMPORTANT — case sensitive paths for Render
app.use("/", require("./routes/home"))
app.use("/inv", require("./routes/inventoryRoutes"))
app.use("/account", require("./routes/accountRoutes"))
app.use("/classification", require("./routes/classificationRoutes"))

/* 404 page */
app.use(async (req, res) => {
  res.status(404).render("errors/error", {
    title: "404 Not Found",
    message: "Sorry, we couldn't find that page.",
  })
})

/* Global error handler */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong. Please try again later.",
  })
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))