const sequelize = require("../../db/index");
const { QueryTypes } = require("sequelize");

class WarningTypeRepository {
  async getAll() {
    try {
      return await sequelize.query(
        `
          SELECT * 
          FROM WarningTypes;
        `,
        { type: QueryTypes.SELECT }
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }

  async getOne(id) {
    try {
      const [entity] = await sequelize.query(
        `
          SELECT *
          FROM WarningTypes
          WHERE id = '${id}';
        `,
        { type: QueryTypes.SELECT }
      );

      return entity;
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }

  async create(item) {
    try {
      const [insertedId, _] = await sequelize.query(
        `
          INSERT INTO WarningTypes
          SET
            name = '${item.name}',
            points_number = '${item.points_number}';
        `,
        { type: QueryTypes.INSERT }
      );

      return await this.getOne(insertedId);
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }

  async update(id, item) {
    try {
      await sequelize.query(
        `
          UPDATE WarningTypes
          SET
            name = '${item.name}',
            points_number = '${item.points_number}'
          WHERE id = '${id}';
        `,
        { type: QueryTypes.UPDATE }
      );

      return await this.getOne(id);
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }

  async delete(id) {
    try {
      await sequelize.query(
        `
          DELETE FROM WarningTypes
          WHERE id = '${id}';
        `,
        { type: QueryTypes.DELETE }
      );

      return {message: "Warning type was successfully deleted"}
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }

  async getList() {
    try {
      const list = await sequelize.query(
        `
          SELECT id AS value, name AS text
          FROM WarningTypes
          ORDER BY id ASC;
        `,
        { type: QueryTypes.SELECT }
      );

      return list;
    } catch (e) {
      console.log(e);
      res.status(500).json({message: `Internal error, ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new WarningTypeRepository();
