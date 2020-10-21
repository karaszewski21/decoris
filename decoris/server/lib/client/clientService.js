const models = require("../../db/models");

const { Op, QueryTypes, Sequelize } = require("sequelize");

class ClientsService {
  #locationCompany = { city: null, voivodeship: null, country: null };
  #businessProfiles = [];
  #profilesAndFittings = {
    aluminiumProfiles: [],
    aluminiumFittings: [],
    pcvProfiles: [],
    pcvFittings: [],
  };
  constructor() {}

  async getCompanyById(id) {
    models.companies.associate(models);
    const company = models.companies.findByPk(id);

    return company;
  }

  async getFilteredClientsListByParametrs(parametrs) {
    console.log(parametrs);
    try {
      models.companies.associate(models);

      let bodyQuery = { include: [] };

      console.log(bodyQuery);
      if (parametrs.name.length !== 0) {
        bodyQuery.where = {
          name: {
            [Op.regexp]: parametrs.name,
          },
        };
      }

      if (parametrs.countries.length !== 0) {
        bodyQuery.include.push({
          model: models.countries,
          required: true,
          where: { name: parametrs.countries },
        });
      } else {
        bodyQuery.include.push({
          model: models.countries,
          required: true,
        });
      }

      if (parametrs.cities.length !== 0) {
        bodyQuery.include.push({
          model: models.cities,
          required: true,
          where: { name: parametrs.cities },
        });
      } else {
        bodyQuery.include.push({
          model: models.cities,
          required: true,
        });
      }

      if (parametrs.business_profiles.length !== 0) {
        bodyQuery.include.push({
          model: models.business_profiles,
          through: { attributes: [] },
          where: { name: parametrs.business_profiles },
        });
      } else {
        bodyQuery.include.push({
          model: models.business_profiles,
          through: { attributes: [] },
        });
      }

      if (parametrs.voivodeships.length !== 0) {
        bodyQuery.include.push({
          model: models.voivodeships,
          required: true,
          where: { name: parametrs.voivodeships },
        });
      } else {
        bodyQuery.include.push({
          model: models.voivodeships,
          required: true,
        });
      }

      bodyQuery.include.push(
        {
          model: models.business_profiles,
          through: { attributes: [] },
        },
        {
          model: models.aluminium_profiles,
          through: { attributes: [] },
        },
        {
          model: models.aluminium_fittings,
          through: { attributes: [] },
        },
        {
          model: models.pcv_fittings,
          through: { attributes: [] },
        },
        {
          model: models.pcv_profiles,
          through: { attributes: [] },
        }
      );

      console.log(bodyQuery);
      const companiesList = await models.models.companies.findAndCountAll({
        attributes: ["name", "nip", "address"],
        include: bodyQuery.include,
        where: bodyQuery.where,
        limit: parametrs.limit,
        offset: parametrs.offset,
      });

      return companiesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCompany(body) {
    const transaction = await databaseProvider.transaction();
    models.companies.belongsTo(notes);
    try {
      await this.complateLocationCompany(body);
      await this.complateBusinessProfiles(body);
      await this.complateProfilesAndFittings(body);

      const company = await models.companies.create(
        {
          name: body.name,
          nip: body.nip,
          email: body.email,
          web_page: body.web_page,
          phone_number: body.phone_number,
          address: body.address,
          post_code: body.post_code,
          city_id: this.#locationCompany.city.id,
          voivodeship_id: this.#locationCompany.voivodeship
            ? this.#locationCompany.voivodeship.id
            : this.#locationCompany.voivodeship,
          country_id: this.#locationCompany.country.id,
        },

        {
          include: [notes],
          transaction: transaction,
        }
      );

      for (const businessProfile of this.#businessProfiles) {
        await models.companies_business_profiles.create(
          {
            company_id: company.id,
            business_profile_id: businessProfile.id,
          },
          {
            transaction: transaction,
          }
        );
      }

      for (const aluminiumProfile of this.#profilesAndFittings
        .aluminiumProfiles) {
        await models.companies_aluminium_profiles.create(
          {
            company_id: company.id,
            aluminium_profile_id: aluminiumProfile.id,
          },
          {
            transaction: transaction,
          }
        );
      }

      for (const aluminiumFitting of this.#profilesAndFittings
        .aluminiumFittings) {
        await models.companies_aluminium_fittings.create(
          {
            company_id: company.id,
            aluminium_fitting_id: aluminiumFitting.id,
          },
          {
            transaction: transaction,
          }
        );
      }

      for (const pcvFitting of this.#profilesAndFittings.pcvFittings) {
        await models.companies_pcv_fittings.create(
          {
            company_id: company.id,
            pcv_fitting_id: pcvFitting.id,
          },
          {
            transaction: transaction,
          }
        );

        for (const pcvProfile of this.#profilesAndFittings.pcvProfiles) {
          await models.companies_pcv_profiles.create(
            {
              company_id: company.id,
              pcv_profile_id: pcvProfile.id,
            },
            {
              transaction: transaction,
            }
          );
        }
      }

      await transaction.commit();
      return company;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async deleteClientByName(nameCompany) {
    const transaction = await databaseProvider.transaction();

    try {
      const company = await models.companies.findOne({
        where: { name: nameCompany },
      });

      await models.notes.destroy({
        where: { id: company.note_id },
        transaction: transaction,
      });

      await models.companies.destroy({
        where: { id: company.id },
        transaction: transaction,
      });

      await transaction.commit();

      return company.id;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async complateBusinessProfiles(body) {
    try {
      for (const name of body.business_profiles) {
        const businessProfile = await models.business_profiles.findOne({
          where: { name: name },
        });

        if (businessProfile) {
          this.#businessProfiles.push(businessProfile.toJSON());
        } else {
          throw new Error(`business profile '${name}' not exist in database`);
        }
        console.log(this.#businessProfiles);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async complateProfilesAndFittings(body) {
    try {
      await this.validateProfiles(body);
      await this.validateFittings(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateProfiles(body) {
    try {
      for (const name of body.aluminium_profiles) {
        const aluminiumProfile = await models.aluminium_profiles.findOne({
          where: { name: name },
        });

        if (aluminiumProfile) {
          this.#profilesAndFittings.aluminiumProfiles.push(
            aluminiumProfile.toJSON()
          );
        } else {
          throw new Error(`aluminium profile '${name}' not exist in database`);
        }
      }

      for (const name of body.pcv_profiles) {
        const pcvProfile = await models.pcv_profiles.findOne({
          where: { name: name },
        });

        if (pcvProfile) {
          this.#profilesAndFittings.pcvProfiles.push(pcvProfile.toJSON());
        } else {
          throw new Error(`pcv profile '${name}' not exist in database`);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async validateFittings(body) {
    try {
      for (const name of body.aluminium_fittings) {
        const aluminiumFitting = await models.aluminium_fittings.findOne({
          where: { name: name },
        });

        if (aluminiumFitting) {
          this.#profilesAndFittings.aluminiumFittings.push(
            aluminiumFitting.toJSON()
          );
        } else {
          throw new Error(`aluminium fitting '${name}' not exist in database`);
        }
      }

      for (const name of body.pcv_fittings) {
        const pcvFitting = await models.pcv_fittings.findOne({
          where: { name: name },
        });

        if (pcvFitting) {
          this.#profilesAndFittings.pcvFittings.push(pcvFitting.toJSON());
        } else {
          throw new Error(`pcv fitting '${name}' not exist in database`);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async complateLocationCompany(body) {
    try {
      await this.validateCountry(body);
      await this.validateCity(body);

      if (this.#locationCompany.country.name === "Polska") {
        await this.validateVoivodeship(body);
      }

      console.log(this.#locationCompany);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateCountry(body) {
    try {
      const country = await models.countries.findOne({
        where: { name: body.country },
      });

      if (country) {
        this.#locationCompany.country = country.toJSON();
      } else {
        throw new Error(`country '${body.country}' not exist in database`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateCity(body) {
    try {
      const city = await models.cities.findOne({
        where: { name: body.city },
      });

      if (city) {
        this.#locationCompany.city = city.toJSON();
      } else {
        throw new Error(`city '${body.city}' not exist in database`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateVoivodeship(body) {
    try {
      const voivodeship = await models.voivodeships.findOne({
        where: { name: body.voivodeship },
      });

      if (voivodeship) {
        this.#locationCompany.voivodeship = voivodeship.toJSON();
      } else {
        throw new Error(
          `voivodeship '${body.voivodeship}' not exist in database`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ClientsService;
