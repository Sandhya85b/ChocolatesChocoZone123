const mongoose = require("mongoose");

const connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Db");
  } catch {
    console.log("Failed connecting to Db");
  }
};

module.exports = connectToDb;
