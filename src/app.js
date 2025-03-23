const express = require("express");
const app = express();

// app.use("/", (req, res) => {
//   //request handler function
//   res.send("Hello from the server!");
// });

app.use("/test", (req, res) => {
  res.send("This is a test response");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the server");
});

app.listen(7777, () => {
  console.log("Server is successfully listening to 7777");
});
