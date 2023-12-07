const rateLimit = require("express-rate-limit");

const globalLimiterMiddleware = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  message: "Too many requests to the platform",
  standardHeaders: true,
	legacyHeaders: false,
});

const userLimiterMiddleware = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  keyGenerator: (req) => req.ip,
  message: "Too many requests to the platform from your IP",
  standardHeaders: true,
	legacyHeaders: false,
});

module.exports = {
  globalLimiterMiddleware,
  userLimiterMiddleware
};
