const {
  cities,
  voivodeships,
  countries,
  notes,
  companies,
  pcv_profiles,
  pcv_fittings,
  aluminium_fittings,
  aluminium_profiles,
  business_profiles,
  databaseProvider,
  companies_aluminium_fittings,
  companies_aluminium_profiles,
  companies_business_profiles,
  companies_pcv_fittings,
  companies_pcv_profiles,
} = require("../../db/models");

const { Op } = require("sequelize");

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
  async getFilteredClientsListByParametrs(parametrs) {
    console.log(parametrs);
    try {
      //companies.belongsTo(cities);
      //   companies.belongsTo(voivodeships, { as: "voivodesships" });
      companies.belongsTo(countries);
      //   companies.belongsTo(notes);
      companies.belongsToMany(business_profiles, {
        through: companies_business_profiles,
      });

      let countriesList = await countries.findAll({
        where: { name: parametrs.countries },
      });

      let businessProfiles = await business_profiles.findAll({
        where: { name: parametrs.business_profiles },
      });

      let businessProfilesIDs = businessProfiles.map((value) => {
        return value.id;
      });

      let countriesIDs = countriesList.map((value) => {
        return value.id;
      });
      console.log(businessProfilesIDs);

      business_profiles.belongsToMany(companies, {
        through: companies_business_profiles,
      });

      const companiesList = await companies.findAndCountAll({
        attributes: ["name", "nip", "address"],
        include: [
          {
            model: business_profiles,
            through: { attributes: [] },
            where: { id: businessProfilesIDs },
          },
          {
            model: countries,
            where: { id: countriesIDs },
          },
        ],
      });
      return companiesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFilteredClientsListByName(name, paging) {
    try {
      companies.belongsTo(cities);
      // companies.belongsTo(voivodeships, { as: "voivodesships" });
      companies.belongsTo(countries);
      companies.belongsTo(notes);

      const companiesList = await companies.findAndCountAll({
        attributes: ["name", "nip", "address"],
        include: [cities, countries, notes],
        where: {
          name: {
            [Op.regexp]: name,
          },
        },
        limit: paging.limit,
        offset: paging.offset,
      });

      return companiesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCompany(body) {
    const transaction = await databaseProvider.transaction();
    companies.belongsTo(notes);
    try {
      await this.complateLocationCompany(body);
      await this.complateBusinessProfiles(body);
      await this.complateProfilesAndFittings(body);

      const company = await companies.create(
        {
          name: body.name,
          nip: body.nip,
          email: body.email,
          web_page: body.web_page,
          phone_number: body.phone_number,
          address: body.address,
          post_code: body.post_code,
          city_id: this.#locationCompany.city.id,
          voivodesship_id: this.#locationCompany.voivodeship
            ? this.#locationCompany.voivodeship.id
            : this.#locationCompany.voivodeship,
          country_id: this.#locationCompany.country.id,
          note: { text: body.notes },
        },

        {
          include: [notes],
          transaction: transaction,
        }
      );

      for (const businessProfile of this.#businessProfiles) {
        await companies_business_profiles.create(
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
        await companies_aluminium_profiles.create(
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
        await companies_aluminium_fittings.create(
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
        await companies_pcv_fittings.create(
          {
            company_id: company.id,
            pcv_fitting_id: pcvFitting.id,
          },
          {
            transaction: transaction,
          }
        );

        for (const pcvProfile of this.#profilesAndFittings.pcvProfiles) {
          await companies_pcv_profiles.create(
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

  resetPrivateField() {
    console.log("reset");
    this.#locationCompany = { city: null, voivodeship: null, country: null };
    this.#businessProfiles = [];
    this.#profilesAndFittings = {
      aluminiumProfiles: [],
      aluminiumFittings: [],
      pcvProfiles: [],
      pcvFittings: [],
    };
    console.log(this.#businessProfiles);
  }

  async complateBusinessProfiles(body) {
    try {
      for (const name of body.business_profiles) {
        const businessProfile = await business_profiles.findOne({
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
        const aluminiumProfile = await aluminium_profiles.findOne({
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
        const pcvProfile = await pcv_profiles.findOne({
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
        const aluminiumFitting = await aluminium_fittings.findOne({
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
        const pcvFitting = await pcv_fittings.findOne({
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
      const country = await countries.findOne({
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
      const city = await cities.findOne({
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
      const voivodeship = await voivodeships.findOne({
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
