const ParametersService = require("../lib/parameters/parameterService");
const logger = require("../config/winston");
const { companies } = require("../db/models");

class ParametersController {
  constructor() {}

  async getParameters(req, res) {
    logger.log("info", ">>> ParametersController >>> getParameters");
    try {
      const parameters = await new ParametersService().getParameters();
      res.send(parameters);
      logger.log("info", "<<< ParametersController <<< getParameters");
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> getParameters`
      );
      res.status(404).send(error.message);
    }
  }

  async getCitiesByCountry(req, res) {
    const countryId = req.params.countryId;
    logger.log(
      "info",
      `>>> ParametersController >>> getCitiesByCountry(${countryId})`
    );
    try {
      const parameters = await new ParametersService().getCitiesByCountryId(
        countryId
      );
      res.send(parameters);
      logger.log("info", "<<< ParametersController <<< getCitiesByCountry");
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> getCitiesByCountry(${countryId})`
      );
      res.status(404).send(error.message);
    }
  }
}

module.exports = new ParametersController();
