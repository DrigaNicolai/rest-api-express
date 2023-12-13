const sequelize = require("../../db/index");
const { QueryTypes } = require("sequelize");

class TagRepository {
  async getAll() {
    try {
      return await sequelize.query(
        `
          SELECT *
          FROM Tags;
        `,
        { type: QueryTypes.SELECT }
      );
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }

  async getOne(id) {
    try {
      const [entity] = await sequelize.query(
        `
          SELECT *
          FROM Tags
          WHERE id = '${id}';
        `,
        { type: QueryTypes.SELECT }
      );

      return entity;
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }

  async findByName(name) {
    try {
      const [entity] = await sequelize.query(
        `
          SELECT *
          FROM Tags
          WHERE name = '${name}';
        `,
        { type: QueryTypes.SELECT }
      );

      return entity;
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }

  async create(item) {
    try {
      const [insertedId, _] = await sequelize.query(
        `
          INSERT INTO Tags (name, description)
          VALUES ('${item.name}', '${item.description}');
        `,
        { type: QueryTypes.INSERT }
      );

      return await this.getOne(insertedId);
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }

  async update(item) {
    try {
      await sequelize.query(
        `
          UPDATE Tags
          SET
            name = '${item.name}',
            description = '${item.description}',
            updatedAt = CURRENT_TIMESTAMP
          WHERE id = '${item.id}';
        `,
        { type: QueryTypes.UPDATE }
      );

      return await this.getOne(item.id);
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }

  async delete(id) {
    try {
      await sequelize.query(
        `
          DELETE FROM Tags
          WHERE id = '${id}';
        `,
        { type: QueryTypes.DELETE }
      );

      return {message: "Tag was successfully deleted"}
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }

  async getList() {
    try {
      return await sequelize.query(
        `
          SELECT id AS value, name AS text
          FROM Tags
          ORDER BY id ASC;
        `,
        { type: QueryTypes.SELECT }
      );

      // return list;
    } catch (e) {
      console.error(e);
      throw new Error(`Tag repository Error: ${e.message}`);
    }
  }
}

module.exports = new TagRepository();
