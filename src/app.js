const express = require("express");
const app = express();

//app.use("/user", [rh1, rh2, rh3, rh4,.....])
//app.use("/user", [rh1, rh2], rh3, rh4, ....)

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling user1");
    next();
  },
  (req, res, next) => {
    console.log("Handling user2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Handling user3");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("Handling user4");
    // res.send("Response 4");
    next();
  },
  (req, res, next) => {
    console.log("Handling user5");
    res.send("Response 4");
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening to 7777");
});
