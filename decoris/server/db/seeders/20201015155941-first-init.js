"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("business_profiles", [
          {
            name: "Hurtownia",
          },
          {
            name: "Producent PCV",
          },
          {
            name: "Producent Alu",
          },
          {
            name: "Producent drzwi stalowych",
          },
          {
            name: "Sklep internetowy",
          },
        ]),
        queryInterface.bulkInsert("aluminium_profiles", [
          {
            name: "Aluprof",
          },
          {
            name: "Aliplast",
          },
          {
            name: "Ponzio",
          },
          {
            name: "Yawal",
          },
          {
            name: "SAPA",
          },
          {
            name: "Blyweerth",
          },
          {
            name: "Reynaers",
          },
        ]),
        { transaction: t },
        queryInterface.bulkInsert("aluminium_fittings", [
          {
            name: "Master",
          },
          {
            name: "Fapim",
          },
          {
            name: "Stac",
          },
        ]),
        { transaction: t },
        queryInterface.bulkInsert("pcv_profiles", [
          {
            name: "Aluplast",
          },
          {
            name: "Veka",
          },
          {
            name: "Rehau",
          },
          {
            name: "Vital",
          },
          {
            name: "Deco",
          },
          {
            name: "Schuco",
          },
          {
            name: "Profine",
          },
        ]),
        { transaction: t },
        queryInterface.bulkInsert("pcv_fittings", [
          {
            name: "Winkhaus",
          },
          {
            name: "Siegenia",
          },
        ]),
        { transaction: t },
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkDelete(
          "business_profiles",
          null,
          {},
          { transaction: t }
        ),
        queryInterface.bulkDelete(
          "aluminium_profiles",
          null,
          {},
          { transaction: t }
        ),
        queryInterface.bulkDelete(
          "aluminium_fittings",
          null,
          {},
          { transaction: t }
        ),
        queryInterface.bulkDelete("pcv_profiles", null, {}, { transaction: t }),
        queryInterface.bulkDelete("pcv_fittings", null, {}, { transaction: t }),
      ]);
    });
  },
};
