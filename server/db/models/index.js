const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const sequelize = new Sequelize(
  process.env.DB_DEV_DATABASE,
  process.env.DB_DEV_USER,
  process.env.DB_DEV_PASS,
  {
    host: process.env.DB_DEV_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
      underscored: true,
    },
    logging: console.log,
  }
);

module.exports = {
  databaseProvider: sequelize,
  cities: require("./cities")(sequelize, DataTypes),
  companies: require("./companies")(sequelize, DataTypes),
  business_profiles: require("./business_profiles")(sequelize, DataTypes),
  companies_aluminium_fittings: require("./companies_aluminium_fittings")(
    sequelize,
    DataTypes
  ),
  companies_aluminium_profiles: require("./companies_aluminium_profiles")(
    sequelize,
    DataTypes
  ),
  companies_business_profiles: require("./companies_business_profiles")(
    sequelize,
    DataTypes
  ),
  companies_pcv_fittings: require("./companies_pcv_fittings")(
    sequelize,
    DataTypes
  ),
  companies_pcv_profiles: require("./companies_pcv_profiles")(
    sequelize,
    DataTypes
  ),
  countries: require("./countries")(sequelize, DataTypes),
  notes: require("./notes")(sequelize, DataTypes),
  aluminium_fittings: require("./aluminium_fittings")(sequelize, DataTypes),
  aluminium_profiles: require("./aluminium_profiles")(sequelize, DataTypes),
  pcv_fittings: require("./pcv_fittings")(sequelize, DataTypes),
  pcv_profiles: require("./pcv_profiles")(sequelize, DataTypes),
  voivodeships: require("./voivodeships")(sequelize, DataTypes),
  position_empolyees: require("./position_employees")(sequelize, DataTypes),
  empolyees: require("./employee")(sequelize, DataTypes),
  users: require("./user")(sequelize, DataTypes),
  accounts: require("./account")(sequelize, DataTypes),
};
