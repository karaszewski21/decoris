"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT,
      },
      createdNote: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE.NOW,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: {
            tableName: "companies",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("notes");
  },
};
