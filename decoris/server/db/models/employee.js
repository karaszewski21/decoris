'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  employee.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    fax: DataTypes.STRING,
    position_empolyee_id: DataTypes.INTEGER,
    company_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};