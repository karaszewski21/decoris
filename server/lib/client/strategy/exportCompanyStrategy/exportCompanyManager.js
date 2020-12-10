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

  async exportCompanies(limit) {
    const totalCountCompany = await new CompanyProvder().getCountCompanies();
    let pages = Math.floor(totalCountCompany / limit);
    const rest = totalCountCompany % limit;

    if (rest > 0) {
      pages++;
    }

    let bodyQuery = {
      limit: limit,
      offset: 0,
      name: [],
      business_profiles: [],
      voivodeships: [],
      cities: [],
      country: "all",
    };

    for (let index = 0; index < pages; index++) {
      if (index === pages - 1) {
        bodyQuery = { ...bodyQuery, limit: rest, offset: index * limit };
      } else {
        bodyQuery = { ...bodyQuery, offset: index * limit };
      }

      let companies = await new CompanyProvder().getFilteredClientsListByParametrs(
        bodyQuery
      );

      let componentList = companies.companies.map((value) => value.toJSON());

      this._strategy.convert(componentList);
    }

    return this._strategy.pathToFile;
  }
};
