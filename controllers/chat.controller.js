const Message = require("../models/message.model");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");

module.exports = {
  accessMessage: async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json("Invalid user id");

    var isChat = await Chat.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username email profile",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: req.user.id,
        isGroup: false,
        users: [req.user.id, userId],
      };
    }
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(fullChat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getChat: async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ createdAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "username email profile",
          });

          res.status(200).send(results);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
