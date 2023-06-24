const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};
