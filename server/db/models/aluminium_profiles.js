'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aluminium_profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  aluminium_profiles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'aluminium_profiles',
  });
  return aluminium_profiles;
};