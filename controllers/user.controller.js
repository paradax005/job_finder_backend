const User = require("../models/user.model");
const CryptoJs = require("crypto-js");

module.exports = {
  /// Update User
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const { password, __v, createdAt, ...userData } = updatedUser._doc;

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  /// DELETE USER
  deleteUser: async (req, res) => {
    try {
      console.log(req.params.id);
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Account deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  /// GET SINGLE USER
  getUser: async (req, res) => {
    try {
      const savedUser = await User.findById(req.params.id);

      const { password, __v, createdAt, ...userData } = savedUser._doc;

      res.status(200).json(userData);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  /// GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();


      res.status(200).json(users);

    } catch (error) {
      res.status(500).json(error);
    }
  },
};
