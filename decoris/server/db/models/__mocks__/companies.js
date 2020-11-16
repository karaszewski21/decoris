const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
dbMock.define("companies", { name: "test" });
