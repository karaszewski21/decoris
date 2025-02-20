"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.position_empolyees.hasMany(models.empolyees);
      models.empolyees.belongsTo(models.position_empolyees);
    }
  }
  employee.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      fax: DataTypes.STRING,
      position_employee_id: DataTypes.INTEGER,
      company_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "employee",
    }
  );

  //employee.beforeCreate((employee) => (employee.id = uuidv4()));
  return employee;
};
