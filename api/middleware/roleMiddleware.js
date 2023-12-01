const { verifyToken } = require("../../utils/token");

const roleMiddleware = (roles) => 
  (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(403).json({message: "User is not authenticated"});
      }

      const { role: userRole } = verifyToken(token);

      let hasRole = false;

      if (roles.includes(userRole)) {
        hasRole = true;
      }

      if (!hasRole) {
        return res.status(403).json({message: "You have no permissions"});
      }

      next();
    } catch (e) {
      return res.status(403).json({message: "Access denied"});
  }
}

module.exports = roleMiddleware;
