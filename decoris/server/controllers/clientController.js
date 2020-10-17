const clientsService = require("../lib/client/clientService");
const logger = require("../config/winston");

class ClientsController {
  constructor() {}
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

  async getFilteredClientsListByName(req, res) {
    console.log(req.params.name);
    try {
      const clients = await new clientsService().getFilteredClientsListByName(
        req.params.name,
        req.body
      );
      res.send(clients);
    } catch (error) {
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

  async deleteClientById(req, res) {
    try {
      res.send("delte" + req.params.id);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = new ClientsController();
