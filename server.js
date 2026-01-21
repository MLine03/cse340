// server.js
const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/layout")

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
const indexRoute = require("./routes/indexRoute")
const inventoryRoute = require("./routes/inventoryRoute") // ✅ must match your file name exactly

app.use("/", indexRoute)
app.use("/inv", inventoryRoute) // ✅ this enables /inv/type/:classificationId

// Start server
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"
app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`)
})
