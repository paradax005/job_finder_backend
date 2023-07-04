const router = require("express").Router();
const chatController = require("../controllers/chat.controller");

const { verifyToken } = require("../middlewares/verify_token");

/// Create Chat
router.post("/", verifyToken, chatController.accessMessage);

/// GET Chats
router.get("/", verifyToken, chatController.getChat);

module.exports = router;
