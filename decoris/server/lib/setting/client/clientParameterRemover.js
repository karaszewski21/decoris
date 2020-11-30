const models = require("../../../db/models");
module.exports = class ClientParameterRemover {
  constructor() {}

  async deleteParameter(parameter) {
    let result;
    try {
      switch (parameter.name) {
        case "city":
          result = await this.deleteCity(parameter);
          break;
        case "country":
          result = await this.deleteCountry(parameter);
          break;
        case "voivodeship":
          result = await this.deleteVoivodeship(parameter);
          break;
        case "businessProfile":
          result = await this.deleteBusinessProfile(parameter);
          break;
        case "aluminiumProfile":
          result = await this.deleteAluminiumProfile(parameter);
          break;
        case "aluminiumFitting":
          result = await this.deleteAluminiumFitting(parameter);
          break;
        case "pcvProfile":
          result = await this.deletePcvProfile(parameter);
          break;
        case "pcvFitting":
          result = await this.deletePcvFitting(parameter);
          break;
        default:
          result = null;
          break;
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteCity(city) {
    try {
      let removeCount = await models.cities.destroy({
        where: { id: city.value.id },
      });

      if (removeCount > 0) {
        city.parameter = "city";
        return city;
      } else {
        throw new Error(`cannot remove ${city}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCountry(country) {
    try {
      let removeCount = await models.countries.destroy({
        where: { id: country.value.id },
      });

      if (removeCount > 0) {
        country.parameter = "country";
        return country;
      } else {
        throw new Error(`cannot remove ${country}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteVoivodeship(voivodeship) {
    try {
      let removeCount = await models.voivodeships.destroy({
        where: { id: voivodeship.value.id },
      });

      if (removeCount > 0) {
        voivodeship.parameter = "voivodeship";
        return voivodeship;
      } else {
        throw new Error(`cannot remove ${voivodeship}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteBusinessProfile(businessProfile) {}

  async deleteAluminiumProfile(aluminiumProfile) {}

  async deleteAluminiumFitting(aluminiumFitting) {}

  async deletePcvProfile(pcvProfile) {}

  async deletePcvFitting(pcvFitting) {}
};
