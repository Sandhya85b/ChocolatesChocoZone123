const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const connectToDb = require("./config/mongo.config");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

connectToDb();

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
