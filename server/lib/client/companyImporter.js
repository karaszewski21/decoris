const StrategyCompanyImportManager = require("./strategy/strategyCompanyImport/strategyCompanyImportManager");
const StategyCompanyImportCsv = require("./strategy/strategyCompanyImport/stategyCompanyImportCsv");

module.exports = class CompanyImporter {
  constructor() {}

  async importCompanies(type) {
    const strategyCompanyImportManager = new StrategyCompanyImportManager();

    switch (type) {
      case "csv":
        const stategyCompanyImportCsv = new StategyCompanyImportCsv();
        strategyCompanyImportManager.strategy = stategyCompanyImportCsv;
        break;

      default:
        break;
    }

    return await strategyCompanyImportManager.importCompanies();
  }
};
