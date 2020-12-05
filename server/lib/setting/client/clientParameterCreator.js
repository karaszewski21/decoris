const models = require("../../../db/models");
module.exports = class ClientParameterCreator {
  constructor() {}

  async switchCreator(parameter) {
    let result;
    try {
      switch (parameter.name) {
        case "city":
          result = await this.createCity(parameter);
          break;
        case "country":
          result = await this.createCountry(parameter);
          break;
        case "voivodeship":
          result = await this.createVoivodeship(parameter);
          break;
        case "businessProfile":
          result = await this.createBusinessProfile(parameter);
          break;
        case "aluminiumProfile":
          result = await this.createAluminiumProfile(parameter);
          break;
        case "aluminiumFitting":
          result = await this.createAluminiumFitting(parameter);
          break;
        case "pcvProfile":
          result = await this.createPcvProfile(parameter);
          break;
        case "pcvFitting":
          result = await this.createPcvFitting(parameter);
          break;
        case "positionEmployee":
          result = await this.createPositionEmployee(parameter);
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

  async createCity(city) {
    try {
      models.cities.associate(models);

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

      let newCity = await models.cities.create({
        name: city.value.name,
        country_id: countryModel.id,
        voivodeship_id: voivodeshipModel ? voivodeshipModel.id : null,
      });

      let modifiedCity = await models.cities.findByPk(newCity.id, {
        include: [models.countries, models.voivodeships],
        raw: true,
      });
      modifiedCity.parameter = "city";

      return modifiedCity;
    } catch (error) {
      throw error;
    }
  }

  async createCountry(country) {
    let newCountry = await models.countries.create({
      name: country.value.name,
    });

    let modifiedCountry = await models.countries.findByPk(newCountry.id, {
      raw: true,
    });

    modifiedCountry.parameter = "country";

    return modifiedCountry;
  }

  async createVoivodeship(voivodeship) {
    let newVoivodeship = await models.voivodeships.create({
      name: voivodeship.value.name,
    });

    let modifiedVoivodeship = await models.voivodeships.findByPk(
      newVoivodeship.id,
      {
        raw: true,
      }
    );

    modifiedVoivodeship.parameter = "country";

    return modifiedVoivodeship;
  }

  async createBusinessProfile(businessProfile) {
    try {
      let newBusinessProfile = await models.business_profiles.create({
        name: businessProfile.value.name,
      });

      let modifiedBusinessProfile = await models.business_profiles.findByPk(
        newBusinessProfile.id,
        {
          raw: true,
        }
      );

      modifiedBusinessProfile.parameter = "businessProfile";

      return modifiedBusinessProfile;
    } catch (error) {
      throw error;
    }
  }

  async createAluminiumProfile(aluminiumProfile) {
    try {
      let newAluminiumProfile = await models.aluminium_profiles.create({
        name: aluminiumProfile.value.name,
      });

      let modifiedAluminiumProfile = await models.aluminium_profiles.findByPk(
        newAluminiumProfile.id,
        {
          raw: true,
        }
      );

      modifiedAluminiumProfile.parameter = "aluminiumProfile";

      return modifiedAluminiumProfile;
    } catch (error) {
      throw error;
    }
  }

  async createAluminiumFitting(aluminiumFitting) {
    try {
      let newAluminiumFitting = await models.aluminium_fittings.create({
        name: aluminiumFitting.value.name,
      });

      let modifiedAluminiumFitting = await models.aluminium_fittings.findByPk(
        newAluminiumFitting.id,
        {
          raw: true,
        }
      );

      modifiedAluminiumFitting.parameter = "aluminiumFitting";

      return modifiedAluminiumFitting;
    } catch (error) {
      throw error;
    }
  }

  async createPcvProfile(pcvProfile) {
    try {
      let newPcvProfile = await models.pcv_profiles.create({
        name: pcvProfile.value.name,
      });

      let modifiedPcvProfile = await models.pcv_profiles.findByPk(
        newPcvProfile.id,
        {
          raw: true,
        }
      );

      modifiedPcvProfile.parameter = "pcvProfile";

      return modifiedPcvProfile;
    } catch (error) {
      throw error;
    }
  }

  async createPcvFitting(pcvFitting) {
    try {
      let newPcvFitting = await models.pcv_fittings.create({
        name: pcvFitting.value.name,
      });

      let modifiedPcvFitting = await models.pcv_fittings.findByPk(
        newPcvFitting.id,
        {
          raw: true,
        }
      );

      modifiedPcvFitting.parameter = "pcvFitting";

      return modifiedPcvFitting;
    } catch (error) {
      throw error;
    }
  }

  async createPositionEmployee(positionEmployee) {
    try {
      let newPositionEmployee = await models.position_empolyees.create({
        name: positionEmployee.value.name,
      });

      let modifiedPositionEmployee = await models.position_empolyees.findByPk(
        newPositionEmployee.id,
        {
          raw: true,
        }
      );

      modifiedPositionEmployee.parameter = "positionEmployee";

      return modifiedPositionEmployee;
    } catch (error) {
      throw error;
    }
  }
};
