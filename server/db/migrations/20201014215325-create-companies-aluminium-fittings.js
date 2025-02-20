"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("companies_aluminium_fittings", {
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
      aluminium_fitting_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "aluminium_fittings",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("companies_aluminium_fittings");
  },
};
