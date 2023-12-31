const sequelize = require("../../db/index");
const { QueryTypes } = require("sequelize");

class AuthRepository {
  async register(item) {
    try {
      const [insertedId, _] = await sequelize.query(
        `
          INSERT INTO users
          SET
            name = '${item.name}',
            email = '${item.email}',
            password = '${item.password}';
        `,
        { type: QueryTypes.INSERT }
      );

      return {message: `User was successfuly created with id = ${insertedId}`};
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new AuthRepository();
