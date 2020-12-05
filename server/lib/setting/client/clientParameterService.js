const logger = require("../../../config/winston");
const models = require("../../../db/models");
const ClientParameterCreator = require("./clientParameterCreator");
const ClientParamaterUpdater = require("./clientParamaterUpdater");
const ParameterValidator = require("./clientParameterValidator");
const ClientParameterRemover = require("./clientParameterRemover");

class ClientParameterService {
  constructor() {}

  async getParameters() {
    logger.log("info", ">>> ClientParametersService >>> getParameters");
    try {
      const countries = await models.countries.findAll();
      const voivodeships = await models.voivodeships.findAll();
      const businessProfiles = await models.business_profiles.findAll();
      const aluminiumProfiles = await models.aluminium_profiles.findAll();
      const aluminiumFittings = await models.aluminium_fittings.findAll();
      const pcvProfiles = await models.pcv_profiles.findAll();
      const pcvFittings = await models.pcv_fittings.findAll();
      const positionEmployees = await models.position_empolyees.findAll();

      logger.log("info", "<<< ClientParametersService <<< getParameters");

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
    logger.log("info", ">>> ClientParametersService >>> getCitiesByCountryId");
    try {
      models.cities.associate(models);

      const cities = await models.cities.findAll({
        where: { country_id: countriesIds },
        include: [models.voivodeships],
      });

      logger.log(
        "info",
        "<<< ClientParametersService <<< getCitiesByCountryId"
      );
      return cities;
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ClientParametersService >>> getCitiesByCountryId`
      );
      throw new Error(error);
    }
  }

  async modifyParameter(parameter) {
    logger.log("info", ">>> ClientParametersService >>> modifyParameter");
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

      logger.log("info", "<<< ClientParametersService <<< modifyParameter");
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
    logger.log("info", ">>> ClientParametersService >>> deleteParameter");
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
