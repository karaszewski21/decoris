const models = require("../../../db/models");
module.exports = class ParameterUpdater {
  constructor() {}

  async switchUpdater(parameter) {
    let result;
    try {
      switch (parameter.name) {
        case "city":
          result = await this.updateCity(parameter);
          break;
        case "country":
          result = await this.updateCountry(parameter);
          break;
        case "voivodeship":
          result = await this.updateVoivodeship(parameter);
          break;
        case "businessProfile":
          result = await this.updateBusinessProfile(parameter);
          break;
        case "aluminiumProfile":
          result = await this.updateAluminiumProfile(parameter);
          break;
        case "aluminiumFitting":
          result = await this.updateAluminiumFitting(parameter);
          break;
        case "pcvProfile":
          result = await this.updatePcvProfile(parameter);
          break;
        case "pcvFitting":
          result = await this.updatePcvFitting(parameter);
          break;
        case "positionEmployee":
          result = await this.updatePositionEmployee(parameter);
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
  async updateCity(city) {
    try {
      let [{ country }, { voivodeship }] = city.association;
      let countryModel, voivodeshipModel;

      if (country.id) {
        countryModel = await models.countries.findByPk(country.id);
      } else {
        countryModel = await models.countries.findOne({
          where: { name: country.name ?? country },
        });
      }

      if (voivodeship?.id) {
        voivodeshipModel = await models.voivodeships.findByPk(voivodeship.id);
      } else {
        voivodeshipModel = voivodeship
          ? await models.voivodeships.findOne({
              where: { name: voivodeship.name ?? voivodeship },
            })
          : null;
      }

      await models.cities.update(
        {
          name: city.value.name.trim(),
          country_id: countryModel.id,
          voivodeship_id: voivodeshipModel ? voivodeshipModel.id : null,
        },
        { where: { id: city.value.id } }
      );

      let updetedCity = await models.cities.findByPk(city.value.id, {
        raw: true,
      });

      updetedCity.parameter = "city";

      return updetedCity;
    } catch (error) {
      throw error;
    }
  }
  async updateCountry(country) {
    try {
      await models.countries.update(
        { name: country.value.name.trim() },
        { where: { id: country.value.id } }
      );

      let updatedCountry = await models.countries.findByPk(country.value.id, {
        raw: true,
      });
      updatedCountry.parameter = "country";

      return updatedCountry;
    } catch (error) {
      throw error;
    }
  }
  async updateVoivodeship(voivodeship) {
    try {
      await models.voivodeships.update(
        { name: voivodeship.value.name },
        { where: { id: voivodeship.value.id } }
      );

      let updatedVoivodeship = await models.voivodeships.findByPk(
        voivodeship.value.id,
        {
          raw: true,
        }
      );
      updatedVoivodeship.parameter = "voivodeship";

      return updatedVoivodeship;
    } catch (error) {
      throw error;
    }
  }
  async updateBusinessProfile(businessProfile) {
    try {
      await models.business_profiles.update(
        { name: businessProfile.value.name.trim() },
        { where: { id: businessProfile.value.id } }
      );

      let updatedBusinessProfile = await models.business_profiles.findByPk(
        businessProfile.value.id,
        {
          raw: true,
        }
      );
      updatedBusinessProfile.parameter = "businessProfile";

      return updatedBusinessProfile;
    } catch (error) {
      throw error;
    }
  }
  async updateAluminiumProfile(aluminiumProfile) {
    try {
      await models.aluminium_profiles.update(
        { name: aluminiumProfile.value.name.trim() },
        { where: { id: aluminiumProfile.value.id } }
      );

      let updatedAluminiumProfile = await models.aluminium_profiles.findByPk(
        aluminiumProfile.value.id,
        {
          raw: true,
        }
      );
      updatedAluminiumProfile.parameter = "aluminiumProfile";

      return updatedAluminiumProfile;
    } catch (error) {
      throw error;
    }
  }
  async updateAluminiumFitting(aluminiumFitting) {
    try {
      await models.aluminium_fittings.update(
        { name: aluminiumFitting.value.name.trim() },
        { where: { id: aluminiumFitting.value.id } }
      );

      let updatedAluminiumFitting = await models.aluminium_fittings.findByPk(
        aluminiumFitting.value.id,
        {
          raw: true,
        }
      );
      updatedAluminiumFitting.parameter = "aluminiumFitting";

      return updatedAluminiumFitting;
    } catch (error) {
      throw error;
    }
  }
  async updatePcvProfile(pcvProfile) {
    try {
      await models.pcv_profiles.update(
        { name: pcvProfile.value.name.trim() },
        { where: { id: pcvProfile.value.id } }
      );

      let updatedPcvProfile = await models.pcv_profiles.findByPk(
        pcvProfile.value.id,
        {
          raw: true,
        }
      );
      updatedPcvProfile.parameter = "aluminiumFitting";

      return updatedPcvProfile;
    } catch (error) {
      throw error;
    }
  }
  async updatePcvFitting(pcvFitting) {
    try {
      await models.pcv_fittings.update(
        { name: pcvFitting.value.name.trim() },
        { where: { id: pcvFitting.value.id } }
      );

      let updatedPcvFitting = await models.pcv_fittings.findByPk(
        pcvFitting.value.id,
        {
          raw: true,
        }
      );
      updatedPcvFitting.parameter = "aluminiumFitting";

      return updatedPcvFitting;
    } catch (error) {
      throw error;
    }
  }
  async updatePositionEmployee(positionEmployee) {
    try {
      await models.position_empolyees.update(
        { name: positionEmployee.value.name.trim() },
        { where: { id: positionEmployee.value.id } }
      );

      let updatedPositionEmployee = await models.position_empolyees.findByPk(
        positionEmployee.value.id,
        {
          raw: true,
        }
      );
      updatedPositionEmployee.parameter = "positionEmployee";

      return updatedPositionEmployee;
    } catch (error) {
      throw error;
    }
  }
};
