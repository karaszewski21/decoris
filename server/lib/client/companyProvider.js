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

  async getCompaniesListToExport(
    bodyQuery,
    selectedColumns,
    selectedColumnsExtended,
    selectedCompaniesIds = null
  ) {
    models.companies.associate(models);
    models.empolyees.associate(models);
    models.cities.associate(models);

    let bodyQuery = { include: [] };

    for (const item of selectedColumnsExtended) {
      switch (item) {
        case "country":
          bodyQuery.include.push({
            model: models.countries,
            required: true,
          });
          break;
        case "city":
          bodyQuery.include.push({
            model: models.cities,
            required: true,
          });
          break;
        case "voivodeship":
          bodyQuery.include.push({
            model: models.cities,
            include: [models.voivodeships],
            required: true,
          });
          break;
        case "employee":
          bodyQuery.include.push({
            model: models.empolyees,
            include: [
              {
                model: models.position_empolyees,
              },
            ],
          });
          break;
        case "note":
          bodyQuery.include.push({ model: models.notes });
          break;
        case "business_profile":
          bodyQuery.include.push({
            model: models.business_profiles,
            through: { attributes: [] },
          });
          break;
        case "aluminium_profile":
          bodyQuery.include.push({
            model: models.aluminium_profiles,
            through: { attributes: [] },
          });
          break;
        case "aluminium_fitting":
          bodyQuery.include.push({
            model: models.aluminium_fittings,
            through: { attributes: [] },
          });
          break;
        case "pcv_fitting":
          bodyQuery.include.push({
            model: models.pcv_fittings,
            through: { attributes: [] },
          });
          break;
        case "pcv_profile":
          bodyQuery.include.push({
            model: models.pcv_profiles,
            through: { attributes: [] },
          });
          break;
        default:
          break;
      }
    }

    bodyQuery.where =
      selectedCompaniesIds === null ? null : { id: selectedCompaniesIds };

    return await await models.companies.findAll({
      attributes: selectedColumns,
      include: bodyQuery.include,
      where: bodyQuery.where,
      limit: bodyQuery.limit,
      offset: bodyQuery.offset,
      order: ["name"],
    });
  }
};
