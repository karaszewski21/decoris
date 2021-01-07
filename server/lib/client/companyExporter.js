const path = require("path");
const fs = require("fs");
const ExportCompanyManager = require("./strategy/exportCompanyStrategy/exportCompanyManager");
const ExportCsvCompany = require("./strategy/exportCompanyStrategy/exportCsvCompany");

module.exports = class CompanyExporter {
  constructor() {}

  async exportCompanies(body) {
    try {
      let pathToFile = path.join(__dirname, "..", "..", "download");
      let fileName = `export-client-${Date.now()}`;
      let limit = 10;

      fs.rmdirSync(pathToFile, { recursive: true });
      fs.mkdirSync(pathToFile);

      const exportCompanyManager = new ExportCompanyManager();

      switch (body.typeFile) {
        case "csv":
          const exportCsvCompany = new ExportCsvCompany(pathToFile, fileName);

          exportCompanyManager.strategy = exportCsvCompany;
          break;

        default:
          throw new Error(`type file "${type}" not opereted`);
      }

      return await exportCompanyManager.exportCompanies(
        limit,
        body.selectedColumns,
        body.selectedColumnsExtended,
        body.selectedCompaniesIds
      );
    } catch (error) {
      throw error;
    }
  }
};
