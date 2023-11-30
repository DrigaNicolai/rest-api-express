const { Sequelize } = require('sequelize');

require('dotenv').config();

let isConnected = false;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const connect = async(sequelize) => {
  try {
    await sequelize.authenticate();

    console.log("\x1b[32m", "Connection to database: OK", "\x1b[0m");

    isConnected = true;
  } catch (e) {
    console.error("\x1b[31m", "Unable to connect to the database:", e, "\x1b[0m");
  }
}

if (!isConnected) {
  connect(sequelize);
}


module.exports = sequelize;
