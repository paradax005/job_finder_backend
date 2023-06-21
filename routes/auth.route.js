const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// Registration
router.post("/register", authController.createUser);

// Login User
router.post("/login", authController.loginUser);

module.exports = router;
