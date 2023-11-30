require('dotenv').config({path: '../.env'});

const config = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test_git": {
    username: "root",
    password: "rootpassword",
    database: "rest_api_express_test_git",
    host: "localhost",
    dialect: "mysql"
  }
}

module.exports = config;
