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
    console.log(req.body.countriesIds);
    const countriesIds = req.body.countriesIds;
    logger.log(
      "info",
      `>>> ParametersController >>> getCitiesByCountry(${countriesIds})`
    );
    try {
      const parameters = await new ParametersService().getCitiesByCountryId(
        countriesIds
      );
      res.send(parameters);
      logger.log("info", "<<< ParametersController <<< getCitiesByCountry");
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> getCitiesByCountry(${countriesIds})`
      );
      res.status(404).send(error.message);
    }
  }
}

module.exports = new ParametersController();
