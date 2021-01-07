const clientsService = require("../lib/client/clientService");
const logger = require("../config/winston");
const { companies } = require("../db/models");

class ClientsController {
  constructor() {}

  async getClientById(req, res) {
    logger.log("info", ">>> getClientById");
    try {
      if (req.params.id) {
        const client = await new clientsService().getCompanyById(req.params.id);
        res.send(client);
      }

      logger.log("info", "<<< getClientById");
    } catch (error) {
      logger.log("error", `${error.message} ${req.url}`);
      res.status(404).send(error.message);
    }
  }

  async updateClient(req, res) {
    let bodyCompany = req.body.company;
    try {
      if (bodyCompany[0]) {
        const client = await new clientsService().updateCompany(bodyCompany[0]);

        res.send(client);
      } else {
        throw new Error(`${bodyCompany}`);
      }
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
      const client = await new clientsService().deleteClientById(req.params.id);
      res.send(client);
    } catch (error) {
      res.status(404).send(`message: ${error.message}`);
    }
  }
  async importClient(req, res) {
    try {
      const client = await new clientsService().importClient();
      res.send(client);
    } catch (error) {
      res.status(404).send(`message: ${error.message}`);
    }
  }

  async exportClient(req, res) {
    try {
      const pathToFile = await new clientsService().exportClient(req.body);
      res.download(pathToFile);
    } catch (error) {
      res.status(404).send(`message: ${error.message}`);
    }
  }
}

module.exports = new ClientsController();
