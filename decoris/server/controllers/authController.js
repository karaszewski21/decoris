const AuthService = require("../lib/authentication/authService");

class AuthController {
  constructor() {}
  async signup(req, res) {
    try {
      const user = await new AuthService().signup(req.body);

      if (user) {
        res.send(user);
      } else {
        res.send({ user: null });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async signin(req, res) {
    try {
      res.send("karas");
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = new AuthController();
