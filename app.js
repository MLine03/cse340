import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import accountRoutes from "./routes/accountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import errorMiddleware from "./utilities/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/account", accountRoutes);
app.use("/inventory", inventoryRoutes);

// Footer intentional error route
app.get("/error500", (req, res, next) => {
  const err = new Error("Intentional 500 Error");
  err.status = 500;
  next(err);
});

// Catch all 404
app.use((req, res) => {
  res.status(404).render("error", { message: "Page not found", status: 404 });
});

// Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));