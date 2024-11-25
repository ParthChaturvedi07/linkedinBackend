const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const token = jwt.sign({ identifier: user._id }, process.env.JWT_KEY, {
    expiresIn: "7d", // Optional: Set token expiration
  });
  return token;
};

module.exports = { generateToken };
