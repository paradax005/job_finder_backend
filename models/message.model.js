const mongoose = require("mongoose");

const MessageModel = mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Message",MessageModel);
