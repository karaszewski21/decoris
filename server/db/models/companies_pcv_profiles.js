'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies_pcv_profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  companies_pcv_profiles.init({
    company_id: DataTypes.UUID,
    pcv_profile_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companies_pcv_profiles',
  });
  return companies_pcv_profiles;
};