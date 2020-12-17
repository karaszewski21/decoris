const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../../db/models");
const { v4: uuidv4 } = require("uuid");
const config = require("../../config/auth.config");

module.exports = class AuthService {
  constructor() {}

  async getAccounts() {
    return await models.accounts.findAll({
      attributes: ["id", "login"],
      raw: true,
    });
  }

  async activeAccount(account) {
    let accountModel = await models.accounts.findByPk(account.id, {
      raw: true,
    });

    if (accountModel) {
      await models.accounts.update({ active: 1 }, { id: accountModel.id });
      return true;
    } else {
      return false;
    }
  }

  async updateAccount(account) {
    let accountModel = await models.accounts.findByPk(account.id, {
      raw: true,
    });

    if (accountModel) {
      await models.accounts.update(
        {
          login: account.login,
          password: bcrypt.hashSync(account.password, 8),
        },
        { where: { id: accountModel.id } }
      );
      return true;
    } else {
      return false;
    }
  }

  async deleteAccount(account) {
    let accountModel = await models.accounts.findByPk(account.id, {
      raw: true,
    });

    if (accountModel) {
      let removeAccount = await models.accounts.destroy({
        where: { id: accountModel.id },
      });
      return removeAccount > 0 ? true : false;
    } else {
      return false;
    }
  }

  async getUsers() {
    return await models.users.findAll();
  }

  async updateUser(user) {
    let userModel = await models.users.findByPk(user.id, {
      raw: true,
    });

    if (userModel) {
      await models.users.update(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        { where: { id: userModel.id } }
      );
      return true;
    } else {
      return false;
    }
  }

  async deleteUser(user) {
    let userModel = await models.users.findByPk(user.id, {
      raw: true,
    });

    if (userModel) {
      let removeUser = await models.users.destroy({
        where: { id: userModel.id },
      });
      return removeUser > 0 ? true : false;
    } else {
      return false;
    }
  }

  async checkLogin(login) {
    let existLogin = await models.accounts.findOne({
      where: { login: login },
      raw: true,
    });
    if (existLogin) {
      return true;
    } else {
      return false;
    }
  }

  async signup(body) {
    let { account } = body;
    try {
      models.accounts.associate(models);
      let existAccount = await models.accounts.findOne({
        include: [{ model: models.users }],
        where: { login: account.login },
        raw: true,
      });

      if (!existAccount) {
        return await this.createAccount(body);
      } else {
        throw new Error(`login ${account.login} is busy`);
      }
    } catch (error) {
      throw error;
    }
  }

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
      accountModel.password = null;

      return accountModel;
    } catch (error) {
      throw error;
    }
  }

  async createAccount(body) {
    let { account, user } = body;
    const transaction = await models.databaseProvider.transaction();

    try {
      let userModel = await models.users.create(
        {
          id: uuidv4(),
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        },
        { transaction: transaction, raw: true }
      );
      let accountModel = await models.accounts.create(
        {
          login: account.login,
          password: bcrypt.hashSync(account.password, 8),
          active: 0,
          user_id: userModel.id,
        },
        { transaction: transaction, raw: true }
      );

      await transaction.commit();
      return await models.accounts.findByPk(accountModel.id, {
        attributes: ["login"],
        raw: true,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  verifyAccount(accountModel, account) {
    return new Promise((resolve, reject) => {
      if (!accountModel) {
        reject({ code: 401, message: `${account.login} not found` });
      }

      if (accountModel.active === 0) {
        reject({ code: 401, message: `${account.login} not active` });
      }

      const passwordIsValid = bcrypt.compareSync(
        account.password,
        accountModel.password
      );

      if (!passwordIsValid) {
        reject({ code: 401, message: `${account.login} invalid password` });
      }

      const token = jwt.sign({ id: accountModel.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      resolve(token);
    });
  }
};
