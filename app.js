const express = require('express');

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
require("./database").init();
