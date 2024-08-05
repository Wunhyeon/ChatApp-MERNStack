// backend/controller/chatController.js

const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $eq: req.user._id } }, { users: { $eq: userId } }],
  })
    .populate("users", "-password") // user에서 password 빼고 Select
    .populate("latestMessage");

  //   isChat = await User.populate(isChat, {
  //     path: "latestMessage.sender",
  //     select: "name pic email",
  //   });

  //   console.log("isChat 2 : ", isChat);

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (err) {
      throw new Error(err.message);
    }
  }
});

module.exports = { accessChat };
