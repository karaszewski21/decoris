const ImportCompanyManager = require("./strategy/importCompanyStrategy/importCompanyManager");
const ImportCsvCompany = require("./strategy/importCompanyStrategy/importCsvCompany");

module.exports = class CompanyImporter {
  constructor() {}

  async importCompanies(type) {
    const strategyCompanyImportManager = new ImportCompanyManager();

    switch (type) {
      case "csv":
        const stategyCompanyImportCsv = new ImportCsvCompany();
        strategyCompanyImportManager.strategy = stategyCompanyImportCsv;
        break;

      default:
        break;
    }

    return await strategyCompanyImportManager.importCompanies();
  }
};
