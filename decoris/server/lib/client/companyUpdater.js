const models = require("../../db/models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const CompanyValidator = require("./companyValidator");
const CompanyCreator = require("./companyCreator");

module.exports = class CompanyUpdater {
  constructor() {
    this.extendedDataOfCompanyMap = new Map();
  }

  async updateCompany(company) {
    try {
      await this.selectDataOfCompanyFromDatabase(company);
      return await this.updateDataOfCompany(company);
    } catch (error) {
      throw new Error(error);
    }
  }

  async selectDataOfCompanyFromDatabase(company) {
    try {
      this.extendedDataOfCompanyMap.set(
        "business_profiles",
        await models.companies_business_profiles.findAll({
          attributes: ["company_id", "business_profile_id"],
          where: { company_id: company.parameters.id },
        })
      );

      this.extendedDataOfCompanyMap.set(
        "aluminium_profiles",
        await models.companies_aluminium_profiles.findAll({
          attributes: ["company_id", "aluminium_profile_id"],
          where: { company_id: company.parameters.id },
        })
      );

      this.extendedDataOfCompanyMap.set(
        "aluminium_fittings",
        await models.companies_aluminium_fittings.findAll({
          attributes: ["company_id", "aluminium_fitting_id"],
          where: { company_id: company.parameters.id },
        })
      );

      this.extendedDataOfCompanyMap.set(
        "pcv_profiles",
        await models.companies_pcv_profiles.findAll({
          attributes: ["company_id", "pcv_profile_id"],
          where: { company_id: company.parameters.id },
        })
      );

      this.extendedDataOfCompanyMap.set(
        "pcv_fittings",
        await models.companies_pcv_fittings.findAll({
          attributes: ["company_id", "pcv_fitting_id"],
          where: { company_id: company.parameters.id },
        })
      );

      this.extendedDataOfCompanyMap.set(
        "employees",
        await models.empolyees.findAll({
          where: { company_id: company.parameters.id },
        })
      );

      this.extendedDataOfCompanyMap.set(
        "notes",
        await models.notes.findAll({
          where: { company_id: company.parameters.id },
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateDataOfCompany(company) {
    let companyValidator = new CompanyValidator();
    let companyCreator = new CompanyCreator();
    const transaction = await models.databaseProvider.transaction();
    try {
      await companyValidator.initData();
      let {
        approvedCompanies,
        rejectedCompanies,
      } = await companyValidator.validateParameters([company]);

      if (approvedCompanies.size > 0) {
        let dataOfCompanyToInsert = await companyCreator.orderCompaniesParameters(
          approvedCompanies
        );
        await this.updateBasicDataOfCompany(company, transaction);
        await this.deleteEmployees(company, transaction);
        await this.deleteNotes(company, transaction);
        await this.deleteExtendedDataOfCompany(company, transaction);
        await companyCreator.insertExtendedDataOfCompanyToDatabase(
          dataOfCompanyToInsert,
          transaction
        );
        await transaction.commit();
        return await companyCreator.selectAddedCompaniesFromDatabase(
          dataOfCompanyToInsert,
          rejectedCompanies
        );
      } else {
        await transaction.rollback();
        return [...rejectedCompanies];
      }
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async updateBasicDataOfCompany(company, transaction) {
    let { parameters: parameter } = company;

    try {
      await models.companies.update(
        {
          name: parameter.name,
          nip: parameter.nip,
          address: parameter.address,
          city_id: parameter.city.id,
          voivodeship_id: parameter.voivodeship.id,
          country_id: parameter.country.id,
        },
        {
          where: { id: parameter.id },
          transaction: transaction,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteNotes(company, transaction) {
    let { parameters: parameter } = company;

    await models.notes.destroy(
      {
        where: { company_id: parameter.id },
      },
      { transaction: transaction }
    );
  }

  async deleteEmployees(company, transaction) {
    let { parameters: parameter } = company;

    await models.empolyees.destroy(
      { where: { company_id: parameter.id } },
      { transaction: transaction }
    );
  }

  async deleteExtendedDataOfCompany(company, transaction) {
    let { parameters: parameter } = company;

    await models.companies_business_profiles.destroy(
      { where: { company_id: parameter.id } },
      { transaction: transaction }
    );
    await models.companies_aluminium_profiles.destroy(
      {
        where: { company_id: parameter.id },
      },
      { transaction: transaction }
    );
    await models.companies_aluminium_fittings.destroy(
      {
        where: { company_id: parameter.id },
      },
      { transaction: transaction }
    );
    await models.companies_pcv_profiles.destroy(
      { where: { company_id: parameter.id } },
      { transaction: transaction }
    );
    await models.companies_pcv_fittings.destroy(
      { where: { company_id: parameter.id } },
      { transaction: transaction }
    );
  }
};
