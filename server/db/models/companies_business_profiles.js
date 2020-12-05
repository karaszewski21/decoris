'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies_business_profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  companies_business_profiles.init({
    company_id: DataTypes.UUID,
    business_profile_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companies_business_profiles',
  });
  return companies_business_profiles;
};