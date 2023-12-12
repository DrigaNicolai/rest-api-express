const cors = require("cors");

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
