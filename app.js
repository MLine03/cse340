import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import accountsRouter from "./routes/accounts.js";
import { accountSession } from "./middleware/accountSession.js";

dotenv.config();

const app = express();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(accountSession);

// Routes
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Vehicle Inventory", nav: req.nav || "" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start server with error handling
const PORT = process.env.PORT || 3000;
app.listen(PORT)
  .on("listening", () => console.log(`Server running on port ${PORT}`))
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Try another port.`);
    } else {
      console.error(err);
    }
    process.exit(1);
  });