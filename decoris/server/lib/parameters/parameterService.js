const logger = require("../../config/winston");
const models = require("../../db/models");

class ParametersService {
  constructor() {}

  async getParameters() {
    logger.log("info", ">>> ParametersService >>> getParameters");
    try {
      const countries = await models.countries.findAll();
      const voivodeships = await models.voivodeships.findAll();
      const businessProfiles = await models.business_profiles.findAll();
      const aluminiumProfiles = await models.aluminium_profiles.findAll();
      const aluminiumFittings = await models.aluminium_fittings.findAll();
      const pcvProfiles = await models.pcv_profiles.findAll();
      const pcvFittings = await models.pcv_fittings.findAll();
      const positionEmpolyess = await models.position_empolyees.findAll();

      logger.log("info", "<<< ParametersService <<< getParameters");

      return {
        countries: countries,
        voivodeships: voivodeships,
        businessProfiles: businessProfiles,
        aluminiumProfiles: aluminiumProfiles,
        aluminiumFittings: aluminiumFittings,
        pcvProfiles: pcvProfiles,
        pcvFittings: pcvFittings,
        positionEmpolyess: positionEmpolyess,
      };
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url}  ParametersService >>> getParameters`
      );
      throw new Error(error);
    }
  }

  async getCitiesByCountryId(countriesIds) {
    logger.log("info", ">>> ParametersService >>> getCitiesByCountryId");
    try {
      models.cities.associate(models);

      const cities = models.cities.findAll({
        where: { country_id: countriesIds },
        include: [models.voivodeships],
      });

      logger.log("info", "<<< ParametersService <<< getCitiesByCountryId");
      return cities;
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersService >>> getCitiesByCountryId`
      );
      throw new Error(error);
    }
  }
}

module.exports = ParametersService;
