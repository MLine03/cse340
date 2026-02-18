const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const inventoryRoute = require("./routes/inventoryRoute")

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: "superSecretKey",
  resave: false,
  saveUninitialized: true
}))
app.use(flash())

// Static files
app.use(express.static("public"))

// View engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// Routes
app.use("/inv", inventoryRoute)

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Jones Surf Shop Inventory Management")
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
