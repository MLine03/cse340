import express from "express";
import session from "express-session";
import flash from "connect-flash"; // Ensure package installed
import accountRoutes from "./routes/accountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import classificationRoutes from "./routes/classificationRoutes.js";
import errorRoutes from "./routes/error.js";

const app = express();

// session middleware
app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: true,
}));

// flash messages
app.use(flash());

// Routes
app.use("/account", accountRoutes);
app.use("/inv", inventoryRoutes);
app.use("/classification", classificationRoutes);

// Error handling
app.use(errorRoutes);

export default app;