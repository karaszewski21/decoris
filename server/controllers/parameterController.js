const ClientParameterService = require("../lib/setting/client/clientParameterService");
const logger = require("../config/winston");
const ParameterImporter = require("../lib/setting/import/parameterImporter");

class ParametersController {
  constructor() {}

  async getParameters(req, res) {
    try {
      const parameters = await new ClientParameterService().getParameters();
      res.send(parameters);
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> getParameters`
      );
      res.status(404).send(error.message);
    }
  }

  async getCitiesByCountry(req, res) {
    const countriesIds = req.body.countriesIds;
    try {
      const parameters = await new ClientParameterService().getCitiesByCountryId(
        countriesIds
      );
      res.send(parameters);
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> getCitiesByCountry(${countriesIds})`
      );
      res.status(404).send(error.message);
    }
  }

  async addOrUpdateParameter(req, res) {
    try {
      let result = await new ClientParameterService().modifyParameter(
        req.body.parameter
      );

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
    try {
      let result = await new ClientParameterService().deleteParameter(
        req.body.parameter
      );

      res.send(result);
    } catch (error) {
      logger.log(
        "error",
        `${error.message} ${req.url} ParametersController >>> deleteParameter`
      );
      res.status(404).send(error.message);
      throw new Error(error);
    }
  }

  async import(req, res) {
    try {
      let result = await new ParameterImporter().importParamater(
        req.params.fileType,
        req.params.parameterType
      );

      res.send(result);
    } catch (error) {
      res.status(404).send(error.message);
      throw new Error(error);
    }
  }
}

module.exports = new ParametersController();
