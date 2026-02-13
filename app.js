const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(
  session({
    secret: "superSecret",
    resave: false,
    saveUninitialized: true,
  })
)
app.use(flash())

app.use((req, res, next) => {
  res.locals.notice = req.flash("notice")
  res.locals.loggedin = true // set to true for testing; replace with real login logic
  res.locals.accountData = { account_id: 1, account_firstname: "Test", account_lastname: "User" } // mock login
  next()
})

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Routes
const reviewRoute = require("./routes/reviewRoute")
app.use("/reviews", reviewRoute)

// Example vehicle detail route
const reviewModel = require("./models/review-model")
app.get("/inventory/detail/:inv_id", async (req, res) => {
  const inv_id = req.params.inv_id
  const vehicle = { inv_id, inv_make: "Toyota", inv_model: "Corolla" } // mock vehicle
  const reviews = await reviewModel.getReviewsByInvId(inv_id)
  res.render("inventory/detail", { title: `${vehicle.inv_make} ${vehicle.inv_model}`, vehicle, reviews })
})

// Home
app.get("/", (req, res) => {
  res.send("CSE 340 Server Running")
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
