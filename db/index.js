const { Sequelize } = require('sequelize');
const dbConfig = require("../database/config/config");

const environment = process.env.NODE_ENV || 'development';

let isConnected = false;

const sequelize = new Sequelize(
  dbConfig[environment].database,
  dbConfig[environment].username,
  dbConfig[environment].password,
  {
    host: dbConfig[environment].host,
    dialect: dbConfig[environment].dialect
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
