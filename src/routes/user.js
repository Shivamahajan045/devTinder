const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender about skills"
    );
    res
      .status(201)
      .json({ message: "Data fetched successfully", data: connectionRequests });
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(201).json({ data });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = userRouter;
