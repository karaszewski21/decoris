"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.notes.belongsTo(models.companies);
    }
  }
  notes.init(
    {
      text: DataTypes.TEXT,
      created_note: DataTypes.DATE,
      company_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "notes",
    }
  );

  return notes;
};
