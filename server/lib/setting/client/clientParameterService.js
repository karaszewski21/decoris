const logger = require("../../../config/winston");
const models = require("../../../db/models");
const ClientParameterCreator = require("./clientParameterCreator");
const ClientParamaterUpdater = require("./clientParamaterUpdater");
const ParameterValidator = require("./clientParameterValidator");
const ClientParameterRemover = require("./clientParameterRemover");
const { Op } = require("sequelize");

class ClientParameterService {
  constructor() {}

  async getParameters() {
    try {
      const countries = await models.countries.findAll({ order: ["name"] });
      const voivodeships = await models.voivodeships.findAll({
        order: ["name"],
      });
      const businessProfiles = await models.business_profiles.findAll({
        order: ["name"],
      });
      const aluminiumProfiles = await models.aluminium_profiles.findAll({
        order: ["name"],
      });
      const aluminiumFittings = await models.aluminium_fittings.findAll({
        order: ["name"],
      });
      const pcvProfiles = await models.pcv_profiles.findAll({
        order: ["name"],
      });
      const pcvFittings = await models.pcv_fittings.findAll({
        order: ["name"],
      });
      const positionEmployees = await models.position_empolyees.findAll({
        order: ["name"],
      });

      return {
        countries: countries,
        voivodeships: voivodeships,
        businessProfiles: businessProfiles,
        aluminiumProfiles: aluminiumProfiles,
        aluminiumFittings: aluminiumFittings,
        pcvProfiles: pcvProfiles,
        pcvFittings: pcvFittings,
        positionEmployees: positionEmployees,
      };
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url}  ClientParametersService >>> getParameters`
      );
      throw new Error(error);
    }
  }

  async getCitiesByCountryId(countriesIds) {
    try {
      models.cities.associate(models);
      let cities = null;
      cities = await models.cities.findAll({
        where: { country_id: countriesIds },
        include: [models.voivodeships],
        order: ["name"],
      });

      return cities;
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ClientParametersService >>> getCitiesByCountryId`
      );
      throw new Error(error);
    }
  }

  async modifyParameter(parameter) {
    try {
      let modifiedParameter;

      if (parameter.name) {
        const updateParameter = await new ParameterValidator().updateParameter(
          parameter
        );

        if (updateParameter) {
          modifiedParameter = await new ClientParamaterUpdater().switchUpdater(
            parameter
          );
        } else {
          modifiedParameter = await new ClientParameterCreator().switchCreator(
            parameter
          );
        }
      } else {
        throw new Error(`parametr key ${parameter.name}`);
      }

      return modifiedParameter;
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ClientParametersService >>> modifyParameter`
      );
      throw new Error(error);
    }
  }

  async deleteParameter(parameter) {
    try {
      if (parameter.name) {
        const removedParameter = await new ClientParameterRemover().deleteParameter(
          parameter
        );
        return removedParameter;
      } else {
        throw new Error(`parametr key ${parameter.name}`);
      }
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ClientParametersService >>> modifyParameter`
      );
      throw new Error(error);
    }
  }
}

module.exports = ClientParameterService;
