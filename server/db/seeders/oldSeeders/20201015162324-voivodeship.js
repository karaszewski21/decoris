"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("voivodeships", [
      { name: "SLASKIE" },
      { name: "PODLASKIE" },
      { name: "ZACHODNIO POMOSKIE" },
      { name: "POMORSKIE" },
      { name: "MAZOWIECKIE" },
      { name: "LODZKIE" },
      { name: "SWIETOKRZYSKIE" },
      { name: "WARMINSKO MAZURSKIE" },
      { name: "PODKARPACKIE" },
      { name: "WIELKOPOLSKIE" },
      { name: "MALOPOLSKIE" },
      { name: "DOLNOSLASKIE" },
      { name: "KUJAWSKO POMORSKIE" },
      { name: "LUBELSKIE" },
      { name: "LUBUSKIE" },
      { name: "OPOLSKIE" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("voivodeships", null, {});
  },
};
