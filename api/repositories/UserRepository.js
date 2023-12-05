const sequelize = require("../../db/index");
const { QueryTypes } = require("sequelize");

class UserRepository {
  async findByEmail(email) {
    try {
      const [user, _] = await sequelize.query(
        `
          SELECT users.*, roles.name as role_name
          FROM users
          JOIN roles ON users.role_id = roles.id
          WHERE users.email = '${email}'
        `,
        { type: QueryTypes.SELECT }
      );

      return user;
    } catch (e) {
      console.error(e);
      throw new Error(`UserRepository Error: ${e.message}`);
    }
  }
}

module.exports = new UserRepository();
