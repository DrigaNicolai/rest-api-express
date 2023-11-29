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
    /* "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT */
    username: 'root',
    password: 'rootpassword',
    database: process.env.DB_NAME_TEST,
    host: 'localhost',
    dialect: process.env.DB_DIALECT
  }
}

module.exports = config;
