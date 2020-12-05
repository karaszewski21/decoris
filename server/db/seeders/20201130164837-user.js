"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        firstName: "Patryk",
        lastName: "Karaszewski",
        email: "karaszewski@gmail.com",
      },
      {
        firstName: "Jakub",
        lastName: "Sokolowski",
        email: "sokolowski@gmail.com",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
