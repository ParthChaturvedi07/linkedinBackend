const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();
module.exports = async function (req, res, next) {
  if (req.cookies.token) {
    return res.status(400).json({ message: "You need to login first" });
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await User.findOne({ email: decoded.email }).select("-password");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
    res.redirect("/");
  }
};
