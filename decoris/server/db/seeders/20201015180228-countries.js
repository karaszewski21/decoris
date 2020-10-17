"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("countries", [{ name: "Polska" }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("countries", null, {});
  },
};
