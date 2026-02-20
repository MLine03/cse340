const express = require('express')
const session = require('express-session')
const path = require('path')
require('dotenv').config()

// Import routes
const inventoryRouter = require('./routes/inventory-routes')

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true })) // parse form data
app.use(express.json()) // parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))) // serve static files

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
)

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.use('/inv', inventoryRouter)

// Default route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Jones Surf Shop Inventory</h1><p>Go to <a href="/inv">Inventory Management</a></p>')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Server Error: ' + err.message)
})

// Handle 404
app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

// Start server
const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})