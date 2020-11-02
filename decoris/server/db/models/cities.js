"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.cities.belongsTo(models.voivodeships);
    }
  }
  cities.init(
    {
      name: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
      voivodeship_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cities",
    }
  );
  return cities;
};
