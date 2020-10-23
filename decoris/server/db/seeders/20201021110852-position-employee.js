"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("position_employees", [
      { name: "Szef" },
      { name: "Prezes" },
      { name: "Kierownik" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("position_employees", null, {});
  },
};
