const express = require('express');
const router = require("./api/routes/index");
const validationMiddleware = require("./api/middleware/validationMiddleware.js");
const authMiddleware = require("./api/middleware/authMiddleware.js");
const swaggerDocs = require("./utils/swagger.js");

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
