const AuthService = require("../lib/authentication/authService");

class AuthController {
  constructor() {}

  async getAccounts(req, res) {
    try {
      const accounts = await new AuthService().getAccounts();
      res.status(200).send(accounts);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async activeAccount(req, res) {
    try {
      const active = await new AuthService().activeAccount(req.body);
      res.status(200).send(active);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async updateAccount(req, res) {
    try {
      const updated = await new AuthService().updateAccount(req.body);
      res.status(200).send(updated);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async deleteAccount(req, res) {
    try {
      const deleted = await new AuthService().deleteAccount(req.body);
      res.status(200).send(deleted);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await new AuthService().getUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const updated = await new AuthService().updateUser(req.body);
      res.status(200).send(updated);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const deleted = await new AuthService().deleteUser(req.body);
      res.status(200).send(deleted);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async checkLogin(req, res) {
    try {
      const existLogin = await new AuthService().checkLogin(req.params.login);
      res.status(200).send(existLogin);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async signin(req, res) {
    try {
      const user = await new AuthService().signin(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(error.code ?? 404).send(error.message);
    }
  }

  async signup(req, res) {
    try {
      const user = await new AuthService().signup(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}

module.exports = new AuthController();
