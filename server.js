const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const baseController = require("./controllers/baseController")

const app = express()

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/layout")

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.get("/", baseController.buildHome)

// Start server
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"
app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`)
})

