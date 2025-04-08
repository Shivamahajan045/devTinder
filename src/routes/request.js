const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
router.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user.firstName + "sent the connection request");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = router;
