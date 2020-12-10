const path = require("path");
const fs = require("fs");
const ExportCompanyManager = require("./strategy/exportCompanyStrategy/exportCompanyManager");
const ExportCsvCompany = require("./strategy/exportCompanyStrategy/exportCsvCompany");

module.exports = class CompanyExporter {
  constructor() {}

  async exportCompanies(type) {
    try {
      let pathToFile = path.join(__dirname, "..", "..", "download");
      let fileName = `export-client-${Date.now()}`;
      let limit = 10;

      fs.rmdirSync(pathToFile, { recursive: true });
      fs.mkdirSync(pathToFile);

      const exportCompanyManager = new ExportCompanyManager();

      switch (type) {
        case "csv":
          const exportCsvCompany = new ExportCsvCompany(pathToFile, fileName);
          exportCompanyManager.strategy = exportCsvCompany;
          break;

        default:
          throw new Error(`type file "${type}" not opereted`);
          break;
      }

      return await exportCompanyManager.exportCompanies(limit);
    } catch (error) {
      throw error;
    }
  }
};
