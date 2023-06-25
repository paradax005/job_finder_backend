const User = require("../models/user.model");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  /// Creating a new User
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();

      res.status(201).json({ savedUser });
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  /// Login User
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.status(401).json("Wrong login details");

      const decryptedPass = CryptoJs.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );

      const sPassword = decryptedPass.toString(CryptoJs.enc.Utf8);

      if (sPassword !== req.body.password)
        return res.status(401).json("Wrong login details");

      const userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isAgent: user.isAgent,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
      );

      const { password, createdAt, updatedAt, __v, ...others } = user._doc;

      return res.status(200).json({ ...others, userToken });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
};
