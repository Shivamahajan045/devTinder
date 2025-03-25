const express = require("express");
const app = express();

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({
    userId: req.params.userId,
    firstName: "Shiva",
    lastName: "Mahajan",
  });
});

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({
    firstName: "Shiva",
    lastName: "Mahajan",
  });
});

app.post("/user", (req, res) => {
  res.send("User created successfully");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(7777, () => {
  console.log("Server is successfully listening to 7777");
});
