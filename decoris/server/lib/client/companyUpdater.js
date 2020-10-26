const models = require("../../db/models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

class CompanyUpdater {
  //   tmpAluminiumProfilesList = new Set();
  //   tmpAluminiumFittingsList = new Set();
  //   tmpPcvProfilesList = new Set();
  //   tmpPcvFittingsList = new Set();
  //   tmpBusinessProfilesList = new Set();
  constructor() {}

  async updateCompanyById(id, body) {
    const transaction = await models.databaseProvider.transaction();
    try {
      console.log(body);
      // models.companies.associate(models);

      await Promise.all([
        await models.companies.update(
          {
            name: body.name,
            nip: body.nip,
            address: body.address,
            city_id: body.city.id,
            voivodeship_id: body.voivodeship.id,
            country_id: body.country.id,
          },
          {
            where: { id: id },
            transaction: transaction,
          }
        ),
        await this.updateOrCreateNoteCopmanyById(id, body, transaction),
        await this.updateOrCreateEmployeeCopmanyById(id, body, transaction),
        await this.updateCompaniesBusinessProfilesByCompanyId(
          id,
          body,
          transaction
        ),
        // models.cities.update(body, {
        //   where: { id: id },
        //   transaction: transaction,
        // }),
        // models.voivodeships.update(body, {
        //   where: { id: id },
        //   transaction: transaction,
        // }),
        // models.countries.update(body, {
        //   where: { id: id },
        //   transaction: transaction,
        // }),
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async updateOrCreateEmployeeCopmanyById(id, body, transaction) {
    try {
      for (const employee of body.employees) {
        if (employee.id) {
          await models.empolyees.update(
            {
              name: employee.name,
              surname: employee.surname,
              phone_number: employee.phone_number,
              fax: employee.fax,
              position_empolyee_id: employee.position_empolyee_id,
            },
            { where: { id: employee.id }, transaction: transaction }
          );
        } else {
          await models.empolyees.create(
            {
              id: uuidv4(),
              name: employee.name,
              surname: employee.surname,
              phone_number: employee.phone_number,
              fax: employee.fax,
              position_empolyee_id: employee.position_empolyee_id,
              company_id: id,
            },
            { transaction: transaction }
          );
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrCreateNoteCopmanyById(id, body, transaction) {
    try {
      for (const note of body.notes) {
        if (note.id) {
          await models.notes.update(
            {
              text: note.text,
              created_note: note.created_note,
            },
            { where: { id: note.id }, transaction: transaction }
          );
        } else {
          await models.notes.create(
            { text: note.text, company_id: id },
            { transaction: transaction }
          );
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCompaniesBusinessProfilesWhenIsEqual(id, body, transaction) {}
  async updateCompaniesBusinessProfilesWhenMoreThanCurrent(
    id,
    body,
    transaction
  ) {}
  async updateCompaniesBusinessProfilesWhenLessThanCurrent(
    id,
    body,
    transaction
  ) {}

  async updateCompaniesBusinessProfilesByCompanyId(id, body, transaction) {
    try {
      let tmpBusinessProfilesList = await models.companies_business_profiles.findAll(
        {
          attributes: ["company_id", "business_profile_id"],
          where: { company_id: id },
          raw: true,
        }
      );

      let bodyBusinessProfiles = body.business_profiles;

      let countCurrentBusinessProfiles = tmpBusinessProfilesList.length;
      let countBusinessProfilesToUpdate = bodyBusinessProfiles.length;

      if (countCurrentBusinessProfiles === countBusinessProfilesToUpdate) {
        this.updateCompaniesBusinessProfilesWhenIsEqual(id, body, transaction);
      } else if (
        countCurrentBusinessProfiles >= countBusinessProfilesToUpdate
      ) {
        await this.updateCompaniesBusinessProfilesLessThanCurrent(
          id,
          body,
          transaction
        );
      } else if (
        countCurrentBusinessProfiles <= countBusinessProfilesToUpdate
      ) {
        await this.updateCompaniesBusinessProfilesLessThanCurrent(
          id,
          body,
          transaction
        );
      }

      //   if (countCurrentBusinessProfiles >= countBusinessProfilesToUpdate) {
      //     for (const [index, element] of [1, 2, 3]) {
      //       console.log(index, element);
      //       if (index <= countBusinessProfilesToUpdate) {
      //         await models.companies_business_profiles.update({
      //           business_profile_id: body.business_profiles[index].id,
      //           where: { company_id: id },
      //           transaction: transaction,
      //         });
      //       } else {
      //         await models.companies_business_profiles.destroy({
      //           where: {
      //             [Op.and]: [
      //               {
      //                 company_id: id,
      //               },
      //               {
      //                 business_profile_id: element.business_profile_id,
      //               },
      //             ],
      //           },
      //           transaction: transaction,
      //         });
      //       }
      //     }
      //   }
      console.log("here");
      //   if (countCurrentBusinessProfiles <= countBusinessProfilesToUpdate) {
      //     for (const [index, businessProfile] of bodyBusinessProfiles) {
      //       if (index <= countCurrentBusinessProfiles) {
      //         await models.companies_business_profiles.update({
      //           business_profile_id: businessProfile.id,
      //           where: { company_id: id },
      //           transaction: transaction,
      //         });
      //       } else {
      //         await models.companies_business_profiles.destroy({
      //           where: { company_id: id },
      //           transaction: transaction,
      //         });
      //       }
      //     }
      //   }

      //   if (body.business_profiles.length === 0) {
      //     await models.companies_business_profiles.destroy({
      //       where: { company_id: id },
      //       transaction: transaction,
      //     });
      //   }
    } catch (error) {
      throw new Error(error);
    }

    // for (const aluminiumProfile of body.aluminium_profiles) {
    // }

    // for (const aluminiumFittings of body.aluminium_fittings) {
    // }

    // for (const pcvFittings of body.pcv_fittings) {
    // }

    // for (const pcvProfiles of body.pcv_profiles) {
    // }

    // tmpAluminiumProfilesList = new Set();
    // tmpAluminiumFittingsList = new Set();
    // tmpPcvProfilesList = new Set();
    // tmpPcvFittingsList = new Set();
    // tmpBusinessProfilesList = new Set();
  }
}

module.exports = CompanyUpdater;
