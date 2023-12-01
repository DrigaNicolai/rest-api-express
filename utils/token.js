const jwt = require("jsonwebtoken");

require('dotenv').config();

const generateAccessToken = (id, role, email) => {
  const payload = {
    id,
    role,
    email
  }

  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  verifyToken
}
