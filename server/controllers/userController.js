class UsersController {
  constructor() {}
  async getUsersList(req, res) {
    try {
      res.send("karas");
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = new UsersController();
