"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("companies_business_profiles", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "companies",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      business_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "business_profiles",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("companies_business_profiles");
  },
};
