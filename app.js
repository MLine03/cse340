// app.js
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";

import accountRoutes from "./routes/accountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import classificationRoutes from "./routes/classificationRoutes.js";
import errorRoutes from "./routes/error.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secretcode",
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});

app.use("/account", accountRoutes);
app.use("/inv", inventoryRoutes);
app.use("/classifications", classificationRoutes);
app.use("/", errorRoutes);

app.listen(process.env.PORT || 5500, () => console.log("Server running"));