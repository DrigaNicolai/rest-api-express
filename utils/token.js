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

module.exports = {
  generateAccessToken
}
