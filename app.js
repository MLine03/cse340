import express from "express"
import dotenv from "dotenv"
import accountRoutes from "./routes/accountRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

// ROUTES
app.use("/account", accountRoutes)
app.use("/inv", inventoryRoutes)

// HOME
app.get("/", (req, res) => {
  res.send("Home Page Working")
})

// ERROR HANDLER (Assignment 3)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Server Error")
})

const PORT = process.env.PORT || 5500
app.listen(PORT, () => console.log(`Server running on ${PORT}`))