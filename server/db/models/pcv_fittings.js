'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pcv_fittings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pcv_fittings.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pcv_fittings',
  });
  return pcv_fittings;
};