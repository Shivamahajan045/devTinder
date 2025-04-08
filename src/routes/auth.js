const express = require("express");
const router = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signup
router.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Error: " + err.message);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassWordValid = await user.validatePassword(password);
    if (isPassWordValid) {
      //create a jwt
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Logged in successfully!");
    } else {
      throw new Error("Invalid crendentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = router;
