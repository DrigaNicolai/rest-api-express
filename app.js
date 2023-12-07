const express = require('express');
const router = require("./api/routes/index");
const validationMiddleware = require("./api/middleware/validationMiddleware.js");
const authMiddleware = require("./api/middleware/authMiddleware.js");
const {
  globalLimiterMiddleware,
  userLimiterMiddleware
} = require("./api/middleware/rateLimitMiddleware.js");
const swaggerDocs = require("./utils/swagger.js");

require('dotenv').config();

let PORT = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV == "test") {
  PORT = Math.floor(Math.random()*60000)+5000;
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(globalLimiterMiddleware);
app.use(userLimiterMiddleware);

app.use("/", router);

app.use(validationMiddleware);
app.use(authMiddleware);


swaggerDocs(app);

const start = async () => {
  try {
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
// require("./database").init();

module.exports = app;
