const models = require("../../db/models");
const { v4: uuidv4 } = require("uuid");
const CompanyValidator = require("./companyValidator");

class CompanyCreator {
  constructor() {}

  async createCompany({ company }) {
    try {
      let companyValidator = new CompanyValidator();
      await companyValidator.initData();

      company = await this.improveCompany(company);

      let companies = await this.addCompaniesToDatabase(
        company,
        companyValidator
      );

      return companies;
    } catch (error) {
      throw new Error(error);
    }
  }

  async improveCompany(company) {
    if (!company[0].parameters.id) {
      company[0].parameters.id = uuidv4();
    }

    company[0].parameters.name = company[0].parameters.name.trim();

    return company;
  }
  async addCompaniesToDatabase(company, companyValidator) {
    try {
      let {
        approvedCompanies,
        rejectedCompanies,
      } = await companyValidator.validateParameters(company);

      if (approvedCompanies.size > 0) {
        let dataOfCompanyToInsert = await this.orderCompaniesParameters(
          approvedCompanies
        );
        await this.insertCompaniesToDatabase(dataOfCompanyToInsert);

        return await this.selectAddedCompaniesFromDatabase(
          dataOfCompanyToInsert,
          rejectedCompanies
        );
      } else {
        return [...rejectedCompanies];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async orderCompaniesParameters(approvedCompanies) {
    let dataOfCompanyToInsert = new Map();
    dataOfCompanyToInsert.set("parameters", []);
    dataOfCompanyToInsert.set("employees", []);
    dataOfCompanyToInsert.set("notes", []);
    dataOfCompanyToInsert.set("business_profiles", []);
    dataOfCompanyToInsert.set("aluminium_profiles", []);
    dataOfCompanyToInsert.set("aluminium_fittings", []);
    dataOfCompanyToInsert.set("pcv_profiles", []);
    dataOfCompanyToInsert.set("pcv_fittings", []);

    try {
      for (const company of approvedCompanies.values()) {
        let {
          parameters,
          employees,
          notes,
          business_profiles,
          aluminium_profiles,
          aluminium_fittings,
          pcv_profiles,
          pcv_fittings,
        } = company;

        dataOfCompanyToInsert.set("parameters", [
          ...dataOfCompanyToInsert.get("parameters"),
          ...[parameters],
        ]);

        dataOfCompanyToInsert.set("employees", [
          ...dataOfCompanyToInsert.get("employees"),
          ...employees.map((employee) => {
            employee.id = employee.id ?? uuidv4();
            employee.company_id = parameters.id;

            return employee;
          }),
        ]);

        dataOfCompanyToInsert.set("notes", [
          ...dataOfCompanyToInsert.get("notes"),
          ...notes.map((note) => {
            note.id = note.id ?? uuidv4();
            note.created_note = new Date(note.created_note);
            note.company_id = parameters.id;

            return note;
          }),
        ]);

        dataOfCompanyToInsert.set("business_profiles", [
          ...dataOfCompanyToInsert.get("business_profiles"),
          ...business_profiles.map((businessProfile) => {
            let business_profile_id = businessProfile.id;
            let company_id = parameters.id;

            return { business_profile_id, company_id };
          }),
        ]);

        dataOfCompanyToInsert.set("aluminium_profiles", [
          ...dataOfCompanyToInsert.get("aluminium_profiles"),
          ...Array.from(aluminium_profiles).map((aluminiumProfiles) => {
            let aluminium_profile_id = aluminiumProfiles.id;
            let company_id = parameters.id;

            return { aluminium_profile_id, company_id };
          }),
        ]);

        dataOfCompanyToInsert.set("aluminium_fittings", [
          ...dataOfCompanyToInsert.get("aluminium_fittings"),
          ...Array.from(aluminium_fittings).map((aluminiumFitting) => {
            let aluminium_fitting_id = aluminiumFitting.id;
            let company_id = parameters.id;

            return { aluminium_fitting_id, company_id };
          }),
        ]);

        dataOfCompanyToInsert.set("pcv_profiles", [
          ...dataOfCompanyToInsert.get("pcv_profiles"),
          ...Array.from(pcv_profiles).map((pcvProfile) => {
            let pcv_profile_id = pcvProfile.id;
            let company_id = parameters.id;

            return { pcv_profile_id, company_id };
          }),
        ]);

        dataOfCompanyToInsert.set("pcv_fittings", [
          ...dataOfCompanyToInsert.get("pcv_fittings"),
          ...Array.from(pcv_fittings).map((pcvFitting) => {
            let pcv_fitting_id = pcvFitting.id;
            let company_id = parameters.id;

            return { pcv_fitting_id, company_id };
          }),
        ]);
      }
      return dataOfCompanyToInsert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertCompaniesToDatabase(dataOfCompanyToInsert) {
    const transaction = await models.databaseProvider.transaction();
    try {
      await this.insertBasicDataOfCompanyToDatabase(
        dataOfCompanyToInsert,
        transaction
      );
      await this.insertExtendedDataOfCompanyToDatabase(
        dataOfCompanyToInsert,
        transaction
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async insertBasicDataOfCompanyToDatabase(dataOfCompanyToInsert, transaction) {
    try {
      await models.companies.bulkCreate(
        dataOfCompanyToInsert.get("parameters"),
        {
          transaction: transaction,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertExtendedDataOfCompanyToDatabase(
    dataOfCompanyToInsert,
    transaction
  ) {
    try {
      await models.empolyees.bulkCreate(
        dataOfCompanyToInsert.get("employees"),
        {
          transaction: transaction,
        }
      );
      await models.notes.bulkCreate(dataOfCompanyToInsert.get("notes"), {
        transaction: transaction,
      });

      await models.companies_business_profiles.bulkCreate(
        dataOfCompanyToInsert.get("business_profiles"),
        {
          fields: ["business_profile_id", "company_id"],
          transaction: transaction,
        }
      );

      await models.companies_aluminium_fittings.bulkCreate(
        dataOfCompanyToInsert.get("aluminium_fittings"),
        {
          fields: ["aluminium_fitting_id", "company_id"],
          transaction: transaction,
        }
      );
      await models.companies_aluminium_profiles.bulkCreate(
        dataOfCompanyToInsert.get("aluminium_profiles"),
        {
          fields: ["aluminium_profile_id", "company_id"],
          transaction: transaction,
        }
      );
      await models.companies_pcv_fittings.bulkCreate(
        dataOfCompanyToInsert.get("pcv_fittings"),
        {
          fields: ["pcv_fitting_id", "company_id"],
          transaction: transaction,
        }
      );
      await models.companies_pcv_profiles.bulkCreate(
        dataOfCompanyToInsert.get("pcv_profiles"),
        {
          fields: ["pcv_profile_id", "company_id"],
          transaction: transaction,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async selectAddedCompaniesFromDatabase(
    dataOfCompanyToInsert,
    rejectedCompanies
  ) {
    try {
      models.companies.associate(models);

      let addedIdsOfCompany = [];

      for (let parameter of dataOfCompanyToInsert.get("parameters")) {
        addedIdsOfCompany.push(parameter.id);
      }

      let companiesList = await models.companies.findAll({
        include: [
          models.cities,
          models.countries,
          models.notes,
          models.empolyees,
          { model: models.business_profiles, through: { attributes: [] } },
          { model: models.aluminium_profiles, through: { attributes: [] } },
          { model: models.aluminium_fittings, through: { attributes: [] } },
          { model: models.pcv_fittings, through: { attributes: [] } },
          { model: models.pcv_profiles, through: { attributes: [] } },
        ],
        where: { id: addedIdsOfCompany },
      });
      return {
        companies: companiesList,
        countAdded: companiesList.length,
        rejectedCompanies: [...rejectedCompanies],
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CompanyCreator;
