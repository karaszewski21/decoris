"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("cities", [
      { name: "Bytow" },
      { name: "Warszawa" },
      { name: "Uga" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("cities", null, {});
  },
};
