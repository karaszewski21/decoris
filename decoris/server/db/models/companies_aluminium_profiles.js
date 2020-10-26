'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies_aluminium_profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  companies_aluminium_profiles.init({
    company_id: DataTypes.UUID,
    aluminium_profile_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companies_aluminium_profiles',
  });
  return companies_aluminium_profiles;
};