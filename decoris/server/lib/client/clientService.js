const models = require("../../db/models");
const CompanyCreator = require("./companyCreator");

const { Op, QueryTypes, Sequelize } = require("sequelize");

class ClientsService {
  constructor() {}

  async getCompanyById(id) {
    models.companies.associate(models);
    const company = models.companies.findByPk(id, {
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

  async updateCompanyById(id, body) {
    const transaction = await models.databaseProvider.transaction();
    try {
      console.log(body);
      models.companies.associate(models);

      Promise.all([
        models.companies.update(body, {
          where: { id: id },
          transaction: transaction,
        }),
        models.cities.update(body, {
          where: { id: id },
          transaction: transaction,
        }),
        models.voivodeships.update(body, {
          where: { id: id },
          transaction: transaction,
        }),
        models.countries.update(body, {
          where: { id: id },
          transaction: transaction,
        }),
      ]);

      transaction.commit();
      const company = this.getCompanyById(id);
      return company;
    } catch (error) {
      transaction.rollback();
      throw new Error(error);
    }
  }

  async getFilteredClientsListByParametrs(parametrs) {
    console.log(parametrs);
    try {
      models.companies.associate(models);

      let bodyQuery = { include: [] };

      console.log(bodyQuery);
      if (parametrs.name.length !== 0) {
        bodyQuery.where = {
          name: {
            [Op.regexp]: parametrs.name,
          },
        };
      }

      if (parametrs.countries.length !== 0) {
        bodyQuery.include.push({
          model: models.countries,
          required: true,
          where: { name: parametrs.countries },
        });
      } else {
        bodyQuery.include.push({
          model: models.countries,
          required: true,
        });
      }

      if (parametrs.cities.length !== 0) {
        bodyQuery.include.push({
          model: models.cities,
          required: true,
          where: { name: parametrs.cities },
        });
      } else {
        bodyQuery.include.push({
          model: models.cities,
          required: true,
        });
      }

      if (parametrs.business_profiles.length !== 0) {
        bodyQuery.include.push({
          model: models.business_profiles,
          through: { attributes: [] },
          where: { name: parametrs.business_profiles },
        });
      } else {
        bodyQuery.include.push({
          model: models.business_profiles,
          through: { attributes: [] },
        });
      }

      if (parametrs.voivodeships.length !== 0) {
        bodyQuery.include.push({
          model: models.voivodeships,
          required: true,
          where: { name: parametrs.voivodeships },
        });
      } else {
        bodyQuery.include.push({
          model: models.voivodeships,
          required: true,
        });
      }

      bodyQuery.include.push(
        models.empolyees,
        models.notes,
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

      console.log(bodyQuery);
      const companiesList = await models.companies.findAndCountAll({
        attributes: ["id", "name", "nip", "address"],
        include: bodyQuery.include,
        where: bodyQuery.where,
        limit: parametrs.limit,
        offset: parametrs.offset,
      });

      return companiesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCompany(body) {
    try {
      const company = await new CompanyCreator().addCompaniesToDatabase(body);

      return company;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteClientById(id) {
    let company = models.companies.findByPk(id);

    if (company) {
      await company.destroy({ where: { id: company.id } });
      return company.id;
    } else {
      throw new Error(`Client by ID '${id}' not exist in database`);
    }
  }
}

module.exports = ClientsService;
