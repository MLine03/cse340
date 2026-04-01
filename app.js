import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes.js"; // relative to CSE340

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/account", accountRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { title: "404 - Page Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { title: "500 - Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});