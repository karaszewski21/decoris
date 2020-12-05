'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies_aluminium_fittings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  companies_aluminium_fittings.init({
    company_id: DataTypes.UUID,
    aluminium_fitting_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companies_aluminium_fittings',
  });
  return companies_aluminium_fittings;
};