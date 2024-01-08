const sequelize = require("../../db/index");
const { QueryTypes } = require("sequelize");

class PostRepository {
  async getAll() {
    try {
      return await sequelize.query(
        `
          SELECT Posts.*, Tags.name as tag, Users.name as author
          FROM Posts
          JOIN Tags ON Posts.tag_id = Tags.id
          JOIN Users ON Posts.author_id = Users.id;
        `,
        { type: QueryTypes.SELECT }
      );
    } catch (e) {
      console.error(e);
      throw new Error(`Post repository Error: ${e.message}`);
    }
  }

  async getByUser(authorId) {
    try {
      return await sequelize.query(
        `
          SELECT Posts.*, Tags.name as tag, Users.name as author
          FROM Posts
          JOIN Tags ON Posts.tag_id = Tags.id
          JOIN Users ON Posts.author_id = Users.id
          WHERE author_id = '${authorId}';
        `,
        { type: QueryTypes.SELECT }
      );
    } catch (e) {
      console.error(e);
      throw new Error(`Post repository Error: ${e.message}`);
    }
  }
  
  async getOne(id) {
    try {
      const [entity] = await sequelize.query(
        `
          SELECT *
          FROM Posts
          WHERE id = '${id}';
        `,
        { type: QueryTypes.SELECT }
      );

      return entity;
    } catch (e) {
      console.error(e);
      throw new Error(`Post repository Error: ${e.message}`);
    }
  }

  async create(item) {
    try {
      const [insertedId, _] = await sequelize.query(
        `
          INSERT INTO Posts (author_id, title, text, tag_id)
          VALUES ('${item.author_id}', '${item.title}', '${item.text}', '${item.tag_id}');
        `,
        { type: QueryTypes.INSERT }
      );

      return await this.getOne(insertedId);
    } catch (e) {
      console.error(e);
      throw new Error(`Post repository Error: ${e.message}`);
    }
  }

  async update(item) {
    try {
      await sequelize.query(
        `
          UPDATE Posts
          SET
            title = '${item.title}',
            text = '${item.text}',
            tag_id = '${item.tag_id}',
            updatedAt = CURRENT_TIMESTAMP
          WHERE id = '${item.id}' AND author_id = '${item.author_id}';
        `,
        { type: QueryTypes.UPDATE }       
      );

      return await this.getOne(item.id);
    } catch (e) {
      console.error(e);
      throw new Error(`Post repository Error: ${e.message}`);
    }
  }

  async delete(id) {
    try {
      await sequelize.query(
        `
          DELETE FROM Posts
          WHERE id = '${id}';
        `,
        { type: QueryTypes.DELETE }
      );

      return {message: "Post was successfully deleted"}
    } catch (e) {
      console.error(e);
      throw new Error(`Post repository Error: ${e.message}`);
    }
  }
}

module.exports = new PostRepository();
