const models = require("../../db/models");
const CompanyCreator = require("./companyCreator");
const CompanyUpdater = require("./companyUpdater");
const CompanyImporter = require("./companyImporter");
const CompanyExporter = require("./companyExporter");
const CompanyProvider = require("./companyProvider");

module.exports = class ClientsService {
  constructor() {}

  async getCompanyById(id) {
    return await new CompanyProvider().getCompanyById(id);
  }

  async getFilteredClientsListByParametrs(parameters) {
    return await new CompanyProvider().getFilteredClientsListByParametrs(
      parameters
    );
  }

  async updateCompany(company) {
    try {
      const existCompany = await models.companies.findByPk(
        company.parameters.id
      );

      if (existCompany) {
        const companyUpdater = new CompanyUpdater();
        return await companyUpdater.updateCompany(company);
      } else {
        throw new Error(`company id ${company.parameters.id} not exist`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCompany(body) {
    try {
      const company = await new CompanyCreator().createCompany(body);

      return company;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteClientById(id) {
    let company = await models.companies.findByPk(id, { raw: true });

    if (company) {
      await models.companies.destroy({ where: { id: company.id } });
      return company;
    } else {
      throw new Error(`Client by ID '${id}' not exist in database`);
    }
  }

  async importClient() {
    return await new CompanyImporter().importCompanies("csv");
  }

  async exportClient(body) {
    return await new CompanyExporter().exportCompanies(body);
  }
};
