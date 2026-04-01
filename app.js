// app.js
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use("/inventory", inventoryRoutes);
app.use("/account", accountRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { code: 404, message: "Page Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { code: 500, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));