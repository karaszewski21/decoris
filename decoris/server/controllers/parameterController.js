const ClientParameterService = require("../lib/setting/client/clientParameterService");
const logger = require("../config/winston");
const { companies } = require("../db/models");

class ParametersController {
  constructor() {}

  async getParameters(req, res) {
    logger.log("info", ">>> ParametersController >>> getParameters");
    try {
      const parameters = await new ClientParameterService().getParameters();
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
      const parameters = await new ClientParameterService().getCitiesByCountryId(
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

  async addOrUpdateParameter(req, res) {
    logger.log(
      "info",
      `>>> ParametersController >>> addOrUpdateParameter>> body: ${req.body}`
    );
    try {
      console.log(req.body.parameter);

      let result = await new ClientParameterService().modifyParameter(
        req.body.parameter
      );

      logger.log("info", "<<< ParametersController <<< addOrUpdateParameter");
      res.send(result);
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> addOrUpdateParameter`
      );
      throw new Error(error);
    }
  }

  async deleteParameter(req, res) {
    logger.log(
      "info",
      `>>> ParametersController >>> deleteParameter>> body: ${req.body}`
    );
    try {
      let result = await new ClientParameterService().deleteParameter(
        req.body.parameter
      );

      logger.log("info", "<<< ParametersController <<< deleteParameter");
      res.send(result);
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> deleteParameter`
      );
      throw new Error(error);
    }
  }
}

module.exports = new ParametersController();
