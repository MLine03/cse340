import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import accountsRouter from "./routes/accounts.js";
import { accountSession } from "./middleware/accountSession.js";

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(accountSession);

app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Vehicle Inventory" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));