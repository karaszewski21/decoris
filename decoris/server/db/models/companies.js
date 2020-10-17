"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
// const {
//   cities,
//   voivodeships,
//   countries,
//   notes,
//   companies,
// } = require("../models");

module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // companies.belongsTo(cities);
      // companies.belongsTo(voivodeships, { as: "voivodesships" });
      // companies.belongsTo(countries);
      // companies.belongsTo(notes);
    }
  }
  companies.init(
    {
      // id: {
      //   type: DataTypes.UUID,
      //   defaultValue: sequelize.UUIDV4,
      // },
      name: DataTypes.STRING,
      nip: DataTypes.STRING,
      email: DataTypes.STRING,
      web_page: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      post_code: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
      country_id: DataTypes.INTEGER,
      voivodesship_id: DataTypes.INTEGER,
      note_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "companies",
    }
  );

  companies.beforeCreate((company) => (company.id = uuidv4()));
  return companies;
};
