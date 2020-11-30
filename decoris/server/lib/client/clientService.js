const models = require("../../db/models");
const CompanyCreator = require("./companyCreator");
const CompanyUpdater = require("./companyUpdater");
const CompanyImporter = require("./companyImporter");

const { Op } = require("sequelize");

module.exports = class ClientsService {
  constructor() {}

  async getCompanyById(id) {
    models.companies.associate(models);
    const company = models.companies.findByPk(id, {
      attributes: ["id", "name", "nip", "address"],
      include: [
        models.cities,
        models.voivodeships,
        models.countries,
        models.empolyees,
        models.notes,
        { model: models.business_profiles, through: { attributes: [] } },
        { model: models.aluminium_profiles, through: { attributes: [] } },
        { model: models.aluminium_fittings, through: { attributes: [] } },
        { model: models.pcv_fittings, through: { attributes: [] } },
        { model: models.pcv_profiles, through: { attributes: [] } },
      ],
    });

    return company;
  }

  async updateCompany(company) {
    // let { company } = body;
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

  async getFilteredClientsListByParametrs(parameters) {
    console.log(parameters);
    try {
      models.companies.associate(models);
      models.empolyees.associate(models);

      let bodyQuery = { include: [] };

      if (parameters.name.length !== 0) {
        bodyQuery.where = {
          name: {
            [Op.regexp]: parameters.name,
          },
        };
      }

      if (parameters.countries.length !== 0) {
        bodyQuery.include.push({
          model: models.countries,
          required: true,
          where: { name: parameters.countries },
        });
      } else {
        bodyQuery.include.push({
          model: models.countries,
          required: true,
        });
      }

      if (parameters.cities.length !== 0) {
        bodyQuery.include.push({
          model: models.cities,
          required: true,
          where: { name: parameters.cities },
        });
      } else {
        bodyQuery.include.push({
          model: models.cities,
          required: true,
        });
      }

      if (parameters.countries[0] === "Polska") {
        if (parameters.voivodeships.length !== 0) {
          bodyQuery.include.push({
            model: models.voivodeships,
            required: true,
            where: { name: parameters.voivodeships },
          });
        } else {
          bodyQuery.include.push({
            model: models.voivodeships,
            required: true,
          });
        }
      }

      if (parameters.business_profiles.length !== 0) {
        bodyQuery.include.push({
          model: models.business_profiles,
          through: { attributes: [] },
          where: { name: parameters.business_profiles },
        });
      } else {
        bodyQuery.include.push({
          model: models.business_profiles,
          through: { attributes: [] },
        });
      }

      bodyQuery.include.push(
        models.notes,
        {
          model: models.empolyees,
          include: [
            {
              model: models.position_empolyees,
            },
          ],
        },
        {
          model: models.business_profiles,
          through: { attributes: [] },
        },
        {
          model: models.aluminium_profiles,
          through: { attributes: [] },
        },
        {
          model: models.aluminium_fittings,
          through: { attributes: [] },
        },
        {
          model: models.pcv_fittings,
          through: { attributes: [] },
        },
        {
          model: models.pcv_profiles,
          through: { attributes: [] },
        }
      );

      const companiesList = await models.companies.findAll({
        attributes: ["id", "name", "nip", "address"],
        include: bodyQuery.include,
        where: bodyQuery.where,
        limit: parameters.limit,
        offset: parameters.offset,
      });

      return { rows: companiesList };
    } catch (error) {
      throw new Error(error);
    }
  }

  async importClient() {
    return await new CompanyImporter().importCompanies("csv");
  }
};
