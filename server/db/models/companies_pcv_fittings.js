'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies_pcv_fittings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  companies_pcv_fittings.init({
    company_id: DataTypes.UUID,
    pcv_fitting_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companies_pcv_fittings',
  });
  return companies_pcv_fittings;
};