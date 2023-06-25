const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
  {
    chatName: { type: String, required: true },
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
    groupeAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatModel);
