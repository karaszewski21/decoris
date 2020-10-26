const models = require("../../db/models");
const { v4: uuidv4 } = require("uuid");

class CompanyCreator {
  tmpCompaniesList = [];
  tmpEmployeesList = [];
  tmpNotesList = [];
  tmpAluminiumProfilesList = new Set();
  tmpAluminiumFittingsList = new Set();
  tmpPcvProfilesList = new Set();
  tmpPcvFittingsList = new Set();
  tmpBusinessProfilesList = new Set();

  countriesModel = [];
  citiesModel = [];
  voivodeshipsModel = [];
  positionEmpolyeesModel = [];
  businessProfileModel = [];
  aluminiumProfilesModel = [];
  aluminiumFittingsModel = [];
  pcvProfilesModel = [];
  pcvFittingsModel = [];

  filteredCompanies = new Map();
  rejectedCompanies = new Map();

  constructor() {}

  async addCompaniesToDatabase(companies) {
    try {
      if (this.citiesModel.length === 0) {
        await this.initData();
      }
      await this.validateParametrs(companies);
      await this.remakeCompaniesParametrs();
      await this.insertCompaniesToDatabase();
      let addedCompaniesList = await this.selectAddedCompaniesFromDatabase();

      return addedCompaniesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async initData() {
    this.countriesModel = await models.countries.findAll({ raw: true });
    this.citiesModel = await models.cities.findAll({ raw: true });
    this.voivodeshipsModel = await models.voivodeships.findAll({ raw: true });
    this.businessProfileModel = await models.business_profiles.findAll({
      raw: true,
    });
    this.positionEmpolyeesModel = await models.position_empolyees.findAll({
      raw: true,
    });
    this.aluminiumFittingsModel = await models.aluminium_fittings.findAll({
      raw: true,
    });

    this.aluminiumProfilesModel = await models.aluminium_profiles.findAll({
      raw: true,
    });

    this.pcvFittingsModel = await models.pcv_fittings.findAll({
      raw: true,
    });

    this.pcvProfilesModel = await models.pcv_profiles.findAll({
      raw: true,
    });
  }

  clearTemporaryArrays() {
    this.tmpCompaniesList = [];
    this.positionEmpolyeesList = [];
    this.tmpEmployeesList = [];
    this.tmpNotesList = [];
    this.tmpBusinessProfilesList = new Set();
    this.tmpAluminiumProfilesList = new Set();
    this.tmpAluminiumFittingsList = new Set();
    this.tmpPcvProfilesList = new Set();
    this.tmpPcvFittingsList = new Set();
  }

  async selectAddedCompaniesFromDatabase() {
    try {
      models.companies.associate(models);

      let nameAddedCompaniesList = [];

      for (let name of this.filteredCompanies.keys()) {
        nameAddedCompaniesList.push(name);
      }

      let companiesList = await models.companies.findAll({
        include: [
          models.cities,
          models.countries,
          models.voivodeships,
          models.notes,
          models.empolyees,
          models.business_profiles,
          models.aluminium_profiles,
          models.aluminium_fittings,
          models.pcv_fittings,
          models.pcv_profiles,
        ],
        where: { name: nameAddedCompaniesList },
      });
      return {
        companies: companiesList,
        countAdded: companiesList.length,
        rejectedCompanies: [...this.rejectedCompanies],
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async insertCompaniesToDatabase() {
    const transaction = await models.databaseProvider.transaction();
    try {
      await models.companies.bulkCreate(this.tmpCompaniesList, {
        transaction: transaction,
      });
      await models.empolyees.bulkCreate(this.tmpEmployeesList, {
        transaction: transaction,
      });
      await models.notes.bulkCreate(this.tmpNotesList, {
        transaction: transaction,
      });
      await models.companies_business_profiles.bulkCreate(
        [...this.tmpBusinessProfilesList],
        {
          transaction: transaction,
        }
      );
      await models.companies_aluminium_fittings.bulkCreate(
        [...this.tmpAluminiumFittingsList],
        {
          transaction: transaction,
        }
      );
      await models.companies_aluminium_profiles.bulkCreate(
        [...this.tmpAluminiumProfilesList],
        {
          transaction: transaction,
        }
      );
      await models.companies_pcv_fittings.bulkCreate(
        [...this.tmpPcvFittingsList],
        {
          transaction: transaction,
        }
      );
      await models.companies_pcv_profiles.bulkCreate(
        [...this.tmpPcvProfilesList],
        {
          transaction: transaction,
        }
      );

      await transaction.commit();

      this.clearTemporaryArrays();
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }
  async remakeCompaniesParametrs() {
    try {
      this.clearTemporaryArrays();

      for (const company of this.filteredCompanies.values()) {
        let {
          parametrs,
          employees,
          notes,
          business_profiles,
          aluminium_profiles,
          aluminium_fittings,
          pcv_profiles,
          pcv_fittings,
        } = company;

        parametrs.id = uuidv4();

        this.tmpCompaniesList.push(parametrs);

        employees.forEach((employee) => {
          employee.id = uuidv4();
          employee.company_id = parametrs.id;
          this.tmpEmployeesList.push(employee);
        });

        notes.forEach((note) => {
          note.company_id = parametrs.id;
          this.tmpNotesList.push(note);
        });

        business_profiles.forEach((businessProfile) => {
          this.tmpBusinessProfilesList.add({
            business_profile_id: businessProfile.id,
            company_id: parametrs.id,
          });
        });

        aluminium_profiles.forEach((aluminiumProfiles) => {
          this.tmpAluminiumProfilesList.add({
            aluminium_profile_id: aluminiumProfiles.id,
            company_id: parametrs.id,
          });
        });

        aluminium_fittings.forEach((businessProfile) => {
          this.tmpAluminiumFittingsList.add({
            aluminium_fitting_id: businessProfile.id,
            company_id: parametrs.id,
          });
        });

        pcv_profiles.forEach((businessProfile) => {
          this.tmpPcvProfilesList.add({
            pcv_profile_id: businessProfile.id,
            company_id: parametrs.id,
          });
        });

        pcv_fittings.forEach((businessProfile) => {
          this.tmpPcvFittingsList.add({
            pcv_fitting_id: businessProfile.id,
            company_id: parametrs.id,
          });
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  *checkCorrectParametrsGenerator(company) {
    this.clearTemporaryArrays();

    let tmpCity = this.citiesModel.find(
      (city) => city.name === company.parametrs.city
    );
    yield { item: tmpCity, name: company.parametrs.city };

    let tmpVoivodeship = this.voivodeshipsModel.find(
      (voivodeship) => voivodeship.name === company.parametrs.voivodeship
    );
    yield { item: tmpVoivodeship, name: company.parametrs.voivodeship };

    let tmpCountry = this.countriesModel.find(
      (country) => country.name === company.parametrs.country
    );
    yield { item: tmpCountry, name: company.parametrs.country };

    for (const employee of company.employees) {
      let tmpNamePosition = this.positionEmpolyeesModel.find(
        (item) => item.name === employee.name_position
      );
      employee.position_empolyee_id = tmpNamePosition.id;
      this.tmpEmployeesList.push(employee);

      yield { item: tmpNamePosition, name: employee.name_position };
    }

    for (const name of company.business_profiles) {
      let businessProfile = this.businessProfileModel.find(
        (item) => item.name === name
      );
      this.tmpBusinessProfilesList.add(businessProfile);
      yield { item: businessProfile, name: name };
    }

    for (const name of company.aluminium_profiles) {
      let aluminiumProfile = this.aluminiumProfilesModel.find(
        (item) => item.name === name
      );
      this.tmpAluminiumProfilesList.add(aluminiumProfile);
      yield { item: aluminiumProfile, name: name };
    }

    for (const name of company.aluminium_fittings) {
      let aluminiumFitting = this.aluminiumFittingsModel.find(
        (item) => item.name === name
      );
      this.tmpAluminiumFittingsList.add(aluminiumFitting);
      yield { item: aluminiumFitting, name: name };
    }

    for (const name of company.pcv_profiles) {
      let pcvProfile = this.pcvProfilesModel.find((item) => item.name === name);
      this.tmpPcvProfilesList.add(pcvProfile);
      yield { item: pcvProfile, name: name };
    }

    for (const name of company.pcv_fittings) {
      let pcvFitting = this.pcvFittingsModel.find((item) => item.name === name);
      this.tmpPcvFittingsList.add(pcvFitting);
      yield { item: pcvFitting, name: name };
    }

    company.parametrs.city_id = tmpCity.id;
    company.parametrs.country_id = tmpCountry.id;
    company.parametrs.voivodeship_id = tmpVoivodeship.id;
    company.employees = this.tmpEmployeesList;
    company.business_profiles = this.tmpBusinessProfilesList;
    company.aluminium_profiles = this.tmpAluminiumProfilesList;
    company.aluminium_fittings = this.tmpAluminiumFittingsList;
    company.pcv_profiles = this.tmpPcvProfilesList;
    company.pcv_fittings = this.tmpPcvFittingsList;
  }

  async validateParametrs(companies) {
    try {
      for (const company of companies) {
        let generator = this.checkCorrectParametrsGenerator(company);

        while (true) {
          let { value, done } = generator.next();

          if (done) {
            break;
          }

          if (value.item) {
            this.filteredCompanies.set(company.parametrs.name, company);
          } else {
            this.filteredCompanies.delete(company.parametrs.name);
            this.rejectedCompanies.set(company.parametrs.name, {
              message: `parametr ${value.name} not exist in database`,
              company: company,
            });
            break;
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CompanyCreator;
