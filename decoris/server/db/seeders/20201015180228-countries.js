"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("countries", [
      { name: "Polska" },
      { name: "Cypr" },
      { name: "Serbia" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("countries", null, {});
  },
};
