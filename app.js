import express from "express";
import session from "express-session";
import flash from "connect-flash";
import accountRoutes from "./routes/accountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true }));
app.use(flash());

// Use routes
app.use("/account", accountRoutes);
app.use("/inv", inventoryRoutes);

app.listen(process.env.PORT || 5500, () => console.log("Server running"));