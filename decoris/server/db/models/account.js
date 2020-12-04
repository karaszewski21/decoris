"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.accounts.belongsTo(models.user);
    }
  }
  Account.init(
    {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "account",
    }
  );
  return Account;
};
