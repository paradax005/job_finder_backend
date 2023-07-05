const Message = require("../models/message.model");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");

module.exports = {
  sendMessage: async (req, res) => {
    const { content, chatId, receiver } = req.body;
    if (!content || !chatId) {
      return res.status(404);
    }
    var newMessage = {
      sender: req.user.id,
      content: content,
      receiver: receiver,
      chat: chatId,
    };

    try {
      var message = await Message.create(newMessage);
      message = await message.populate("sender", "username email profile");
      message = await message.populate("chat", "username email profile");
      message = await User.populate(message, {
        path: "chat.users",
        select: "username email profile",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.json(message);
    } catch (error) {
      return res
        .status(500)
        .json(`couldn't retrieve message: ${error.message}`);
    }
  },
  getAllMessages: async (req, res) => {
    try {
      /// Number of messages per page
      const pageSize = 12;
      /// Current page number
      const page = req.query.page || 1;
      /// Calculate total number of messages to skip
      const skipMessage = (page - 1) * pageSize;

      /// Find messages by pagination
      var messages = await Message.find({ chat: req.params.id })
        .populate("sender", "username email profile")
        .populate("chat")
        /// Sort Message by descending order
        .sort({ createdAt: -1 })
        /// Skip Messages based on pagination
        .skip(skipMessage)
        .limit(pageSize);

      messages = await User.populate(messages, {
        path: "chat.users",
        select: "username email profile",
      });

      res.json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
