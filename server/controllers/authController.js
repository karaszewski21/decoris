const AuthService = require("../lib/authentication/authService");

class AuthController {
  constructor() {}

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
