const express = require("express");
const connectDB = require("./config/database");
const app = express();

connectDB()
  .then(() => {
    console.log("Database connnected successfully...");

    app.listen(7777, () => {
      console.log("Server is successfully listening to 7777");
    });
  })
  .catch((err) => {
    console.error("Database not connected...");
  });
