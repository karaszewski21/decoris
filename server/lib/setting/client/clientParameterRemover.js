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
        case "positionEmployee":
          result = await this.deletePositionEmployee(parameter);
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
        throw new Error(`cannot remove ${city.name}`);
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
        throw new Error(`cannot remove ${country.value.name}`);
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
        throw new Error(`cannot remove ${voivodeship.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteBusinessProfile(businessProfile) {
    try {
      let removeCount = await models.business_profiles.destroy({
        where: { id: businessProfile.value.id },
      });

      if (removeCount > 0) {
        businessProfile.parameter = "businessProfile";
        return businessProfile;
      } else {
        throw new Error(`cannot remove ${businessProfile.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAluminiumProfile(aluminiumProfile) {
    try {
      let removeCount = await models.aluminium_profiles.destroy({
        where: { id: aluminiumProfile.value.id },
      });

      if (removeCount > 0) {
        aluminiumProfile.parameter = "aluminiumProfile";
        return aluminiumProfile;
      } else {
        throw new Error(`cannot remove ${aluminiumProfile.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAluminiumFitting(aluminiumFitting) {
    try {
      let removeCount = await models.aluminium_fittings.destroy({
        where: { id: aluminiumFitting.value.id },
      });

      if (removeCount > 0) {
        aluminiumFitting.parameter = "aluminiumFitting";
        return aluminiumFitting;
      } else {
        throw new Error(`cannot remove ${aluminiumFitting.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deletePcvProfile(pcvProfile) {
    try {
      let removeCount = await models.pcv_profiles.destroy({
        where: { id: pcvProfile.value.id },
      });

      if (removeCount > 0) {
        pcvProfile.parameter = "pcvProfile";
        return pcvProfile;
      } else {
        throw new Error(`cannot remove ${pcvProfile.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deletePcvFitting(pcvFitting) {
    try {
      let removeCount = await models.pcv_fittings.destroy({
        where: { id: pcvFitting.value.id },
      });

      if (removeCount > 0) {
        pcvFitting.parameter = "pcvFitting";
        return pcvFitting;
      } else {
        throw new Error(`cannot remove ${pcvFitting.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deletePositionEmployee(positionEmployee) {
    try {
      let removeCount = await models.position_empolyees.destroy({
        where: { id: positionEmployee.value.id },
      });

      if (removeCount > 0) {
        positionEmployee.parameter = "positionEmployee";
        return positionEmployee;
      } else {
        throw new Error(`cannot remove ${positionEmployee.value.name}`);
      }
    } catch (error) {
      throw error;
    }
  }
};
