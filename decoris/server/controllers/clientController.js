const clientsService = require("../lib/client/clientService");
const logger = require("../config/winston");
const { companies } = require("../db/models");

class ClientsController {
  constructor() {}

  async getClientById(req, res) {
    logger.log("info", ">>> getClientById");
    try {
      const client = await new clientsService().getCompanyById(req.params.id);
      res.send(client);
      logger.log("info", "<<< getClientById");
    } catch (error) {
      logger.log("error", `${error.message} ${req.url}`);
      res.status(404).send(error.message);
    }
  }

  async updateClientById(req, res) {
    logger.log("info", ">>> updateClientById");
    try {
      const client = await new clientsService().updateCompanyById(
        req.params.id,
        req.body
      );

      res.send(client);
      logger.log("info", "<<< updateClientById");
    } catch (error) {
      logger.log("error", `${error.message} ${req.url}`);
      res.status(404).send(error.message);
    }
  }

  async getFilteredClientsListByParametrs(req, res) {
    logger.log("info", ">>> getClientsList");
    try {
      const clients = await new clientsService().getFilteredClientsListByParametrs(
        req.body
      );
      res.send(clients);
      logger.log("info", "<<< getClientsList");
    } catch (error) {
      logger.log("error", `${error.message} ${req.url}`);
      res.status(404).send(error.message);
    }
  }

  async createClient(req, res) {
    try {
      logger.log("info", `>>> createClient, body: ${req.body}`);
      const client = await new clientsService().createCompany(req.body);
      res.send(client);
      logger.log("info", `<<< createClient, body: ${req.body}`);
    } catch (error) {
      logger.log("error", `${error.message} ${req.url}`);
      res.status(404).send(error.message);
    }
  }

  async deleteClientById(req, res) {
    try {
      const clientId = await new clientsService().deleteClientById(
        req.params.id
      );
      res.send(clientId);
    } catch (error) {
      res.status(404).send(`message: ${error.message}`);
    }
  }
}

module.exports = new ClientsController();
