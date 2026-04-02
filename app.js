// app.js
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Routes
app.use("/account", accountRoutes);
app.use("/inventory", inventoryRoutes);

// 404 handler
app.use((req, res) => res.status(404).send("Page Not Found"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));