const express = require("express");
const app = express();

app.get("/getAllData", (req, res) => {
  try {
    //Logic of fetching data from db
    throw new Error("asdf");
    res.send("All data sent");
  } catch (error) {
    res.status(500).send("Something error occured in db");
  }
});

//error handling middleware -- act as wildcard route
app.use("/", (err, req, res, next) => {
  res.status(500).send("Something went wrong");
});

app.listen(7777, () => {
  console.log("Server is successfully listening to 7777");
});
