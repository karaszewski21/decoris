const models = require("../../db/models");

module.exports = class CompanyValidator {
  constructor() {
    // this.filteredCompanies = new Map();
    // this.rejectedCompanies = new Map();
    this.filteredCompanies = new Map();
    this.rejectedCompanies = new Map();
    this.tmpCompaniesList = [];
    this.tmpEmployeesList = [];
    this.tmpNotesList = [];
    this.tmpAluminiumProfilesList = new Set();
    this.tmpAluminiumFittingsList = new Set();
    this.tmpPcvProfilesList = new Set();
    this.tmpPcvFittingsList = new Set();
    this.tmpBusinessProfilesList;
    this.countriesModel = [];
    this.citiesModel = [];
    this.voivodeshipsModel = [];
    this.positionEmployeesModel = [];
    this.businessProfileModel = [];
    this.aluminiumProfilesModel = [];
    this.aluminiumFittingsModel = [];
    this.pcvProfilesModel = [];
    this.pcvFittingsModel = [];
  }

  async initData() {
    try {
      this.countriesModel = await models.countries.findAll({ raw: true });
      this.citiesModel = await models.cities.findAll({ raw: true });
      this.voivodeshipsModel = await models.voivodeships.findAll({ raw: true });
      this.businessProfileModel = await models.business_profiles.findAll({
        raw: true,
      });
      this.positionEmployeesModel = await models.position_empolyees.findAll({
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateParameters(companies) {
    try {
      for (const company of companies) {
        let generator = this.checkCorrectParametersGenerator(company);

        while (true) {
          let { value, done } = generator.next();

          if (done) {
            break;
          }

          if (value.item) {
            this.filteredCompanies.set(company.parameters.name, company);
          } else {
            this.filteredCompanies.delete(company.parameters.name);
            this.rejectedCompanies.set(company.parameters.name, {
              message: `parametr ${value.name} not exist in database`,
              company: company,
            });
            break;
          }
        }
      }
      return {
        approvedCompanies: this.filteredCompanies,
        rejectedCompanies: this.rejectedCompanies,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  *checkCorrectParametersGenerator(company) {
    this.clearTemporaryArrays();

    let tmpCity = this.citiesModel.find(
      (city) => city.name === company.parameters.city
    );
    yield { item: tmpCity, name: company.parameters.city };

    let tmpVoivodeship = this.voivodeshipsModel.find(
      (voivodeship) => voivodeship.name === company.parameters.voivodeship
    );
    yield { item: tmpVoivodeship, name: company.parameters.voivodeship };

    let tmpCountry = this.countriesModel.find(
      (country) => country.name === company.parameters.country
    );
    yield { item: tmpCountry, name: company.parameters.country };

    for (const employee of company.employees) {
      let tmpNamePosition = this.positionEmployeesModel.find(
        (item) => item.name === employee.positionEmployee.name
      );
      employee.position_empolyee_id = tmpNamePosition?.id;
      this.tmpEmployeesList.push(employee);

      yield { item: tmpNamePosition, name: employee.positionEmployee.name };
    }

    for (const name of company.business_profiles) {
      let businessProfile = this.businessProfileModel.find(
        (item) => item.name === name
      );
      this.tmpBusinessProfilesList.push(businessProfile);
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

    company.parameters.city_id = tmpCity.id;
    company.parameters.country_id = tmpCountry.id;
    company.parameters.voivodeship_id = tmpVoivodeship.id;
    company.employees = this.tmpEmployeesList;
    company.business_profiles = this.tmpBusinessProfilesList;
    company.aluminium_profiles = this.tmpAluminiumProfilesList;
    company.aluminium_fittings = this.tmpAluminiumFittingsList;
    company.pcv_profiles = this.tmpPcvProfilesList;
    company.pcv_fittings = this.tmpPcvFittingsList;
  }

  clearTemporaryArrays() {
    this.tmpCompaniesList = [];
    this.positionEmpolyeesList = [];
    this.tmpEmployeesList = [];
    this.tmpNotesList = [];
    this.tmpBusinessProfilesList = [];
    this.tmpAluminiumProfilesList = new Set();
    this.tmpAluminiumFittingsList = new Set();
    this.tmpPcvProfilesList = new Set();
    this.tmpPcvFittingsList = new Set();
  }
};
