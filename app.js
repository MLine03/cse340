import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import accountsRouter from "./routes/accounts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);