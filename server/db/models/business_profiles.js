"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class business_profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  business_profiles.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "business_profiles",
    }
  );
  return business_profiles;
};
