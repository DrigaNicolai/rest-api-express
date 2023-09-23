const Sequalize = require("sequelize");

require('dotenv').config();

const db = {
  init: async () => {
    const connection = new Sequalize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
      }
    );

    try {
      await connection.authenticate();
      console.log("\x1b[32m", "Connection to database: OK");
    } catch (e) {
      console.error("\x1b[31m", "Unable to connect to the database:", e);
    }
  }
}

module.exports = db;
