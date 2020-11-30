const models = require("../../../db/models");
module.exports = class ParameterValidator {
  constructor() {}

  async updateParameter(parameter) {
    try {
      if (parameter.association) {
        let isCorrectAssociation = await this.validateAssociation(
          parameter.association
        );
        if (!isCorrectAssociation) {
          throw new Error(
            `association of parameter ${parameter.name} is not correct`
          );
        }
      }

      let updateParameter = await this.validateParameter(parameter);

      return updateParameter;
    } catch (error) {
      throw error;
    }
  }
  async validateParameter(parameter) {
    // let item = Object.values(parameter);

    // let value = {
    //   [item[0]]: parameter.value,
    // };
    let updateParameter = await this.validateSwitch(
      parameter.name,
      parameter.value
    );
    return updateParameter;
  }

  async validateAssociation(association) {
    let result;
    try {
      for (const value of association) {
        let item = Object.entries(value)[0];

        if (item[1] === null) {
          continue;
        }

        result = await this.validateSwitch(item[0], item[1]);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async validateSwitch(key, value) {
    let result;

    try {
      switch (key) {
        case "city":
          result = await this.existCity(value);
          break;
        case "country":
          result = await this.existCountry(value);
          break;
        case "voivodeship":
          result = await this.existVoivodeship(value);
          break;
        case "businessProfile":
          result = await this.existBusinessProfile(value.businessProfile);
          break;
        case "aluminiumProfile":
          result = await this.existAluminiumProfile(value.aluminiumProfile);
          break;
        case "aluminiumFitting":
          result = await this.existAluminiumFitting(value.aluminiumFitting);
          break;
        case "pcvProfile":
          result = await this.existPcvProfile(value.pcvProfile);
          break;
        case "pcvFitting":
          result = await this.existPcvFitting(value.pcvFitting);
          break;
        default:
          break;
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async existCity(city) {
    let cityModel = null;
    try {
      if (city.id) {
        cityModel = await models.cities.findByPk(city.id);
      } else {
        cityModel = await models.cities.findOne({
          where: { name: city.name ?? city },
        });
      }

      return cityModel ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async existCountry(country) {
    let countryModel = null;
    try {
      if (country.id) {
        countryModel = await models.countries.findByPk(country.id);
      } else {
        countryModel = await models.countries.findOne({
          where: { name: country.name ?? country },
        });
      }

      return countryModel ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async existVoivodeship(voivodeship) {
    let voivodeshipModel = null;
    try {
      if (voivodeship.id) {
        voivodeshipModel = await models.voivodeships.findByPk(voivodeship.id);
      } else {
        voivodeshipModel = await models.voivodeships.findOne({
          where: { name: voivodeship.name ?? voivodeship },
        });
      }

      return voivodeshipModel ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async existBusinessProfile(businessProfile) {
    let businessProfileModel = null;
    try {
      if (businessProfile.id) {
        businessProfileModel = await models.pcv_profiles.findByPk(
          businessProfile.id
        );
      } else {
        businessProfileModel = await models.pcv_profiles.findOne({
          where: { name: businessProfile.name ?? businessProfile },
        });
      }

      return businessProfileModel ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async existAluminiumProfile(aluminiumProfile) {
    let aluminiumProfileModel = null;
    try {
      if (aluminiumProfile.id) {
        aluminiumProfileModel = await models.aluminium_profiles.findByPk(
          aluminiumProfile.id
        );
      } else {
        aluminiumProfileModel = await models.aluminium_profiles.findOne({
          where: { name: aluminiumProfile.name ?? aluminiumProfile },
        });
      }

      return aluminiumProfileModel ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async existAluminiumFitting(aluminiumFitting) {
    let aluminiumFittingModel = null;
    try {
      if (aluminiumFitting.id) {
        aluminiumFittingModel = await models.aluminium_fittings.findByPk(
          aluminiumFitting.id
        );
      } else {
        aluminiumFittingModel = await models.aluminium_fittings.findOne({
          where: { name: aluminiumFitting.name ?? aluminiumFitting },
        });
      }

      return aluminiumFittingModel ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async existPcvProfile(pcvProfile) {
    let pcvProfileModel = null;
    try {
      if (pcvProfile.id) {
        pcvProfileModel = await models.pcv_profiles.findByPk(pcvProfile.id);
      } else {
        pcvProfileModel = await models.pcv_profiles.findOne({
          where: { name: pcvProfile.name ?? pcvProfile },
        });
      }

      return pcvProfileModel ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async existPcvFitting(pcvFitting) {
    let pcvFittingModel = null;
    try {
      if (pcvFitting.id) {
        pcvFittingModel = await models.pcv_fittings.findByPk(pcvFitting.id);
      } else {
        pcvFittingModel = await models.pcv_fittings.findOne({
          where: { name: pcvFitting.name ?? pcvFitting },
        });
      }

      return pcvFittingModel ? true : false;
    } catch (error) {
      throw error;
    }
  }
};
