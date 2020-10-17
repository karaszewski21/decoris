"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("voivodeships", [
      { name: "Wielkopolskie" },
      { name: "Kujawsko-pomorskie" },
      { name: "Małopolskie" },
      { name: "Łódzkie" },
      { name: "Dolnośląskie" },
      { name: "Lubelskie" },
      { name: "Lubuskie" },
      { name: "Mazowieckie" },
      { name: "Opolskie" },
      { name: "Podlaskie" },
      { name: "Pomorskie" },
      { name: "Śląskie" },
      { name: "Podkarpackie" },
      { name: "Świętokrzyskie" },
      { name: "Warmińsko-Mazurskie" },
      { name: "Zachodniopomorskie" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("voivodeships", null, {});
  },
};
