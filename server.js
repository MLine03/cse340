// server.js
const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

// Routes
const indexRoute = require("./routes/indexRoute")
const inventoryRoute = require("./routes/inventoryRoute")

// Set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/layout")

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", indexRoute)
app.use("/inv", inventoryRoute)

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
