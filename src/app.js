const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("../middlewares/auth");
// Middlewares why do we need it

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("user data sent!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("user data sent!");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent!");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted user!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening to 7777");
});
