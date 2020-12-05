const company = require("../fake/client/client.json");
const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

var companyMock = dbMock.define("companies", company.company);
