const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
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

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    if (!fromUserId || !toUserId) {
      throw new Error("Invalid request");
    }
    // if (fromUserId == toUserId) {
    //   throw new Error("You cannot send request to yourself");
    // }

    const isAllowedStatus = ["interested", "ignored"];
    if (!isAllowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type " + status });
    }
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).send({ message: "Connection already exists!" });
    }

    const toUser = User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res
      .status(201)
      .json({ message: "Connection request sent successfully", data });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(404).json({ message: "Status not found" });
      }
      if (!requestId) {
        return res.status(404).json({ message: "Invalid requestId" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.status(201).json({ message: "Connection request " + status, data });
    } catch (err) {
      console.log("Error: " + err.message);
      res
        .status(500)
        .json({ message: "Something went wrong!", Error: err.message });
    }
  }
);

module.exports = router;
