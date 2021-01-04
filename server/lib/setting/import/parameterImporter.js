const ImportParameterManager = require("./strategy/importParameterManager");
const ImportCsvCityVoivodeship = require("./strategy/importCsvCityVoivodeship");

module.exports = class ParameterImporter {
  constructor() {}

  async importParamater(fileType, parameterTyp) {
    switch (fileType) {
      case "csv":
        await this.importCsvBySelectedParameter(parameterTyp);
        break;

      default:
        break;
    }
  }

  async importCsvBySelectedParameter(parameterTyp) {
    const importManager = new ImportParameterManager();

    switch (parameterTyp) {
      case "city-voivodeship":
        const stategyImportCsvCityVoivodeship = new ImportCsvCityVoivodeship();
        importManager.strategy = stategyImportCsvCityVoivodeship;
        break;

      default:
        break;
    }

    return await importManager.importParameter();
  }
};
