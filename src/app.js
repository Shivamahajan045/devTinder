const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const app = express();

app.use(express.json());

//signup
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassWordValid = await bcrypt.compare(password, user.password);
    if (isPassWordValid) {
      res.send("Logged in successfully!");
    } else {
      throw new Error("Invalid crendentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
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

//delete user
// Model.findByIdAndDelete(id);
app.delete("/user", async (req, res) => {
  let userId = req.body.userId;
  // let userEmail = req.body.emailId;
  try {
    let user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(201).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Model.findOneAndDelete()
// app.delete("/user", async (req, res) => {
//   let firstName = req.body.firstName;
//   // let userEmail = req.body.emailId;
//   try {
//     let user = await User.findOneAndDelete({ firstName: firstName });
//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.status(201).send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

//update
//Model.findByIdAndUpdate(id, ...)
app.patch("/user", async (req, res) => {
  let userId = req.body.userId;
  const data = req.body;
  console.log(data);
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      data,
      {
        returnDocument: "after",
      },
      { runValidators: true }
    );

    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(201).send(user);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Something went wrong");
  }
});

//Model.findOneAndUpdate()
// app.patch("/user", async (req, res) => {
//   let firstName = req.body.firstName;
//   const data = req.body;
//   try {
//     let user = await User.findOneAndUpdate({ firstName: firstName }, data, {
//       runValidators: true,
//     });
//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.status(201).send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

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
