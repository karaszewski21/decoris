const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

module.exports = {
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASS,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_HOST,
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
