const express = require("express")
const path = require("path")
const app = express()
require("dotenv").config()

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")

app.get("/", baseController.buildHome)
app.use("/inv", inventoryRoute)

// Favicon
app.get("/favicon.ico", (req, res) => res.status(204))

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500)
  res.render("error", { title: "Error", message: err.message })
})

// Start server
const port = process.env.PORT || 5500
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))