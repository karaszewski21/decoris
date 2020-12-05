const AuthService = require("../lib/authentication/authService");

class AuthController {
  constructor() {}
  async signin(req, res) {
    try {
      const user = await new AuthService().signin(req.body);
      res.status(200).send({ user: user });
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async signup(req, res) {
    try {
      // user: {firstName: "ssds", lastName: "sdsds", "email: "dsds", login: "ssddsd", password:"ssdds" }

      const user = await new AuthService().signup(req.body);
      res.status(200).send({ user: user });
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = new AuthController();
