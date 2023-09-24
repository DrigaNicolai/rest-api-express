const express = require('express');
const router = require("./api/routes/index");

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());
app.use("/", router);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
// require("./database").init();
