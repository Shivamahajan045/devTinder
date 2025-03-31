const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//signup
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Mahendrasingh",
    lastName: "Dhoni",
    emailId: "msd@gmail.com",
    password: "Msd@123",
    age: 47,
  });
  try {
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("User not created", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connnected successfully...");

    app.listen(7777, () => {
      console.log("Server is successfully listening to 7777....");
    });
  })
  .catch((err) => {
    console.error("Database not connected...");
  });
