// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Example route
const { buildVehicleDetail } = require("./utilities/buildVehicleDetail");
app.get("/", async (req, res) => {
  const sampleVehicle = {
    inv_image: "/images/vehicles/adventador.jpg",
    inv_make: "Lamborghini",
    inv_model: "Adventador",
    inv_year: 2022,
    inv_price: 500000,
    inv_miles: 1200,
    inv_description: "A supercar in mint condition."
  };

  const html = buildVehicleDetail(sampleVehicle);
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});