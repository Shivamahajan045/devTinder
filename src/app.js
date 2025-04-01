const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

//signup
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("User not created", err.message);
  }
});

//get user - using Model.find() - return a array of objects
// app.get("/user", async (req, res) => {
//   let userEmail = req.body.emailId;
//   try {
//     let user = await User.find({ emailId: userEmail });
//     console.log(user);
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.status(201).send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// Model.find({}) - empty filter will return all documents from the model
// app.get("/user", async (req, res) => {
//   try {
//     let user = await User.find({});
//     console.log(user);
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.status(201).send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

//Model.findOne() - return a 1st document if filter matches the multiple documents
app.get("/user", async (req, res) => {
  let userEmail = req.body.emailId;
  try {
    let user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(201).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
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
