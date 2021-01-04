const fs = require("fs");
const path = require("path");
const CompanyCreator = require("../../companyCreator");
const CompanyValidator = require("../../companyValidator");

module.exports = class ImportCompanyManager {
  constructor() {
    this._strategy = null;
    this.companyValidator = new CompanyValidator();
    this.companyCreator = new CompanyCreator();
  }
  set strategy(strategy) {
    this._strategy = strategy;
  }

  get strategy() {
    return this._strategy;
  }

  async importCompanies() {
    return new Promise(async (resolve, reject) => {
      await this.companyValidator.initData();
      while (true) {
        let { done, value } = await this._strategy.importCompanies();

        if (done) {
          await this.importCompaniesToDatabase(value);
          break;
        } else {
          await this.importCompaniesToDatabase(value);
        }
      }

      resolve("Import copmanies is ready");
    });
  }

  async importCompaniesToDatabase(company) {
    try {
      let {
        approvedCompanies,
        rejectedCompanies,
      } = await this.companyValidator.validateParameters(company);

      if (approvedCompanies.size > 0) {
        let dataOfCompanyToInsert = await this.companyCreator.orderCompaniesParameters(
          approvedCompanies
        );
        await this.companyCreator.insertCompaniesToDatabase(
          dataOfCompanyToInsert
        );
        await this.saveRejectedCompaniesToFile(rejectedCompanies);
      } else {
        await this.saveRejectedCompaniesToFile(rejectedCompanies);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveRejectedCompaniesToFile(rejectedCompanies) {
    return new Promise(async (resolve, reject) => {
      for (const row of rejectedCompanies.values()) {
        fs.appendFile(
          path.join(__dirname, "rejectedCompanies.txt"),
          `${row.message} ${row.company.parameters.name}\r\n`,
          "utf-8",
          (err) => {
            if (err) throw err;
          }
        );
      }
      resolve("Import copmanies is ready");
    });
  }
};
