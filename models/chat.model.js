const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatModel);
