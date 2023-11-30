const { verifyToken } = require("../../utils/token");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.split(' ')[1];
  
      if (!token) {
        return res.status(403).json({message: "User is not authenticated"});
      }
  
      verifyToken(token);
    }
  
    next();
  } catch (e) {
    return res.status(403).json({message: "User is not authenticated"});
  }
  
}

module.exports = authMiddleware;
