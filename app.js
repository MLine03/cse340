// app.js
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import accountRoutes from "./routes/accountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import classificationRoutes from "./routes/classificationRoutes.js";
import errorRoute from "./routes/error.js";

dotenv.config();

const app = express();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use(flash());

// Global messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/account", accountRoutes);
app.use("/inv", inventoryRoutes);
app.use("/classification", classificationRoutes);

// Error handler
app.use(errorRoute);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));