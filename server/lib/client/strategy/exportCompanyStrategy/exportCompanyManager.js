const CompanyProvder = require("./../../companyProvider");

module.exports = class ExportCompanyManager {
  constructor() {
    this._strategy = null;
  }
  set strategy(strategy) {
    this._strategy = strategy;
  }

  get strategy() {
    return this._strategy;
  }

  async exportCompanies(
    limit,
    selectedColumns,
    selectedColumnsExtended,
    selectedCompaniesIds
  ) {
    let totalCountCompany;
    if (selectedCompaniesIds === null) {
      totalCountCompany = await new CompanyProvder().getCountCompanies();
    } else {
      totalCountCompany = selectedCompaniesIds.length;
    }

    let pages = Math.floor(totalCountCompany / limit);
    const rest = totalCountCompany % limit;

    if (rest > 0) {
      pages++;
    }

    if (selectedCompaniesIds === null) {
      let bodyQuery;
      for (let index = 0; index < pages; index++) {
        if (index === pages - 1) {
          bodyQuery = { limit: rest, offset: index * limit };
        } else {
          bodyQuery = { offset: index * limit };
        }

        let companies = await new CompanyProvder().getCompaniesListToExport(
          bodyQuery,
          selectedColumns,
          selectedColumnsExtended
        );

        let componentList = companies.companies.map((value) => value.toJSON());

        await this._strategy.convert(componentList);
      }
    } else {
      let partialCompaniesIds = [];

      for (let index = 0; index < pages; index++) {
        if (index === pages - 1) {
          bodyQuery = { ...bodyQuery, limit: rest, offset: index * limit };
          partialCompaniesIds = selectedCompaniesIds.slice(index * limit, rest);
        } else {
          bodyQuery = { ...bodyQuery, offset: index * limit };
          partialCompaniesIds = selectedCompaniesIds.slice(index * limit);
        }

        let companies = await new CompanyProvder().getCompaniesListToExport(
          bodyQuery,
          selectedColumns,
          partialCompaniesIds
        );

        let componentList = companies.companies.map((value) => value.toJSON());

        await this._strategy.convert(componentList);
      }
    }

    return this._strategy.pathToFile;
  }
};
