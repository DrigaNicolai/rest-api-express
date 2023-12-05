const sequelize = require("../../db/index");
const { QueryTypes } = require("sequelize");

class AuthRepository {
  async register(item) {
    try {
      const [insertedId, _] = await sequelize.query(
        `
          INSERT INTO users (name, email, password)
          VALUES ('${item.name}', '${item.email}', '${item.password}');
        `,
        { type: QueryTypes.INSERT }
      );

      return {message: `User was successfuly created with id = ${insertedId}`};
    } catch (e) {
      console.error(e);
      throw new Error(`AuthRepository Error: ${e.message}`);
    }
  }
}

module.exports = new AuthRepository();
