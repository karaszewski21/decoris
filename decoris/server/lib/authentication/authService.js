var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const models = require("../../db/models");
module.exports = class AuthService {
  constructor() {}
  //register
  async signup(account) {
    try {
      let existAccount = await models.accounts.findOne({
        include: [models.users],
        where: { login: account.login },
        raw: true,
      });

      if (!existAccount) {
        return await this.createAccount(existAccount);
      } else {
        throw new Error(`${account.login} is busy`);
      }
    } catch (error) {
      throw error;
    }
  }

  //login
  //account: {login: "ssddsd", password:"ssdds" }
  async signin(account) {
    models.accounts.associate(models);
    try {
      let accountModel = await models.accounts.findOne({
        include: [models.users],
        where: { login: account.login },
        raw: true,
      });

      let token = await this.verifyAccount(accountModel, account);
      accountModel.token = token;

      return accountModel;
    } catch (error) {
      throw error;
    }
  }

  // user: {firstName: "ssds", lastName: "sdsds", "email: "dsds", login: "ssddsd", password:"ssdds" }
  async createAccount(account) {
    let { user } = account;
    const transaction = await models.databaseProvider.transaction();

    try {
      let userModel = await models.users.create(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        { transaction: transaction, raw: true }
      );
      let accountModel = await models.accounts.create(
        {
          login: user.login,
          password: bcrypt.hashSync(user.password, 8),
          active: 0,
          user_id: userModel.id,
        },
        { transaction: transaction, raw: true }
      );

      transaction.commit();
      models.accounts.associate(models);
      return await models.accounts.findByPk(accountModel.id, {
        include: [models.users],
        raw: true,
      });
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  verifyAccount(accountModel, account) {
    return new Promise((resolve, reject) => {
      if (!accountModel) {
        reject(`${account.login} not found`);
        //  throw new Error(`${user.login} not found`);
      }

      if (accountModel.active === 0) {
        reject(`${account.login} not active`);
        //  throw new Error(`${account.login} not active`);
      }

      const passwordIsValid = bcrypt.compareSync(
        account.password,
        accountModel.password
      );

      if (!passwordIsValid) {
        reject(`${account.login} invalid password`);
        //  throw new Error(`Invalid Password`);
      }

      const token = jwt.sign({ id: accountModel.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      resolve(token);
    });
  }
};
