const { Sequelize } = require("sequelize");

require('dotenv').config();

let sequelize;

beforeAll(async () => {
  sequelize = new Sequelize(
    process.env.DB_NAME_TEST,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    }
  );

  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});
