var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const models = require("../../db/models");
module.exports = class AuthService {
  constructor() {}

  async signup(account) {
    try {
      let existAccount = await models.accounts.findOne({
        include: [models.users],
        where: { login: account.login },
        raw: true,
      });

      if (existAccount) {
        return await verifyAccount(existAccount);
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async signin(account) {
    try {
    } catch (error) {
      throw error;
    }
  }

  verifyAccount() {
    return new Promise((resolve, reject) => {});
  }
};
