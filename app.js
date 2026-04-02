// app.js
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import accountsRouter from "./routes/accounts.js";

dotenv.config();
const app = express();

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "CSE340 Home Page", nav: "" });
});

// Error fallback
app.use((req, res) => {
  res.status(404).render("error", { title: "Page Not Found", message: "404 - Page Not Found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));