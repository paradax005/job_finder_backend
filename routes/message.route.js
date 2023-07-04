const router = require("express").Router();
const messageController = require("../controllers/message.controller");

const { verifyToken } = require("../middlewares/verify_token");

/// Send Message
router.post("/", verifyToken, messageController.sendMessage);

/// GET All Messages
router.get("/:id", verifyToken, messageController.getAllMessages);



module.exports = router;
