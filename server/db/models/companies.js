"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.companies.belongsTo(models.cities);
      models.companies.belongsTo(models.countries);
      // models.companies.belongsTo(models.voivodeships);
      models.companies.hasMany(models.notes);
      models.companies.hasMany(models.empolyees);

      models.companies.belongsToMany(models.aluminium_profiles, {
        through: models.companies_aluminium_profiles,
      });
      models.companies.belongsToMany(models.aluminium_fittings, {
        through: models.companies_aluminium_fittings,
      });
      models.companies.belongsToMany(models.pcv_fittings, {
        through: models.companies_pcv_fittings,
      });
      models.companies.belongsToMany(models.pcv_profiles, {
        through: models.companies_pcv_profiles,
      });

      models.companies.belongsToMany(models.business_profiles, {
        through: { model: models.companies_business_profiles },
      });
    }
  }
  companies.init(
    {
      name: DataTypes.STRING,
      nip: DataTypes.STRING,
      email: DataTypes.STRING,
      web_page: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      post_code: DataTypes.STRING,
      city_id: { type: DataTypes.INTEGER },
      country_id: DataTypes.INTEGER,
      //    voivodeship_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "companies",
    }
  );

  //companies.beforeCreate((company) => (company.id = uuidv4()));
  return companies;
};
