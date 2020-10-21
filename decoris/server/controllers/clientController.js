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

  async updateClient(req, res) {
    try {
      res.send("update" + req.params.id);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async deleteClientByName(req, res) {
    try {
      const clientId = await new clientsService().deleteClientByName(
        req.params.name
      );
      res.send(clientId);
    } catch (error) {
      res.status(404).send(`message: ${error.message}`);
    }
  }
}

module.exports = new ClientsController();
