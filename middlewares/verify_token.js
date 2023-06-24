const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
      if (err) res.status(403).json("Invalid credentials");

      const connectedUser = await User.findById(user.id);

      req.user = connectedUser;
      console.log(req.user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("you are restricted to perform this action");
    }
  });
};

const isAnAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are restricted to perform this action");
    }
  });
};
module.exports = { verifyToken, verifyAndAuthorization, isAnAdmin };
