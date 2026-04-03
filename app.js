import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import homeRouter from "./routes/home.js";
import accountsRouter from "./routes/accounts.js";
import inventoryRouter from "./routes/inventory.js";
import { accountSession } from "./middleware/accountSession.js";

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(accountSession);
app.use(express.static("public"));

app.use("/", homeRouter);
app.use("/accounts", accountsRouter);
app.use("/inventory", inventoryRouter);

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// 500 Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Internal Server Error",
  });
});

// 404
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "Page Not Found",
    message: "404 - Page Not Found",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));