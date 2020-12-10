const models = require("../../db/models");
const { Op } = require("sequelize");

module.exports = class CompanyProvder {
  constructor() {}

  async getCompanyById(id) {
    models.companies.associate(models);
    const company = models.companies.findByPk(id, {
      attributes: ["id", "name", "nip", "address"],
      include: [
        models.cities,
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

  async getFilteredClientsListByParametrs(parameters) {
    console.log(parameters);
    try {
      models.companies.associate(models);
      models.empolyees.associate(models);
      models.cities.associate(models);

      let bodyQuery = { include: [] };

      if (parameters.name.length !== 0) {
        bodyQuery.where = {
          name: {
            [Op.startsWith]: parameters.name,
          },
        };
      }

      switch (parameters.country) {
        case "polish":
          bodyQuery.include.push({
            model: models.countries,
            required: true,
            where: { id: 1 },
          });
          break;
        case "foreign":
          bodyQuery.include.push({
            model: models.countries,
            required: true,
            where: { id: { [Op.not]: 1 } },
          });
          break;
        case "all":
          bodyQuery.include.push({
            model: models.countries,
            required: true,
          });
          break;
        default:
          break;
      }

      if (parameters.cities.length !== 0) {
        bodyQuery.include.push({
          model: models.cities,
          include: [models.voivodeships],
          required: true,
          where: { name: parameters.cities },
        });
      } else {
        bodyQuery.include.push({
          model: models.cities,
          include: [models.voivodeships],
          required: true,
        });
      }

      if (parameters.voivodeships.length !== 0) {
        bodyQuery.include.push({
          model: models.cities,
          include: [
            {
              model: models.voivodeships,
              where: {
                name: parameters.voivodeships,
              },
              required: true,
            },
          ],
        });
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

      const countCompanies = await this.getCountCompanies(bodyQuery);

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
        attributes: [
          "id",
          "name",
          "nip",
          "address",
          "web_page",
          "email",
          "post_code",
          "phone_number",
        ],
        include: bodyQuery.include,
        where: bodyQuery.where,
        limit: parameters.limit,
        offset: parameters.offset,
        order: ["name"],
      });

      return { count: countCompanies, companies: companiesList };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCountCompanies(bodyQuery = null) {
    if (bodyQuery) {
      return await models.companies.count({
        include: bodyQuery.include,
        where: bodyQuery.where,
      });
    } else {
      return await models.companies.count();
    }
  }
};
