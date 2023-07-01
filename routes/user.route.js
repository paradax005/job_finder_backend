const express = require("express");
const userController = require("../controllers/user.controller");
const {
  isAnAdmin,
  verifyToken,
} = require("../middlewares/verify_token");
const router = express.Router();

/// Get Connected User
router.get("/", verifyToken, userController.getUser);
/// Update User
router.put("/", verifyToken, userController.updateUser);

/// Delete User
router.delete("/", verifyToken, userController.deleteUser);

/// GET ALL USERS
router.get("/", isAnAdmin, userController.getAllUsers);

module.exports = router;
