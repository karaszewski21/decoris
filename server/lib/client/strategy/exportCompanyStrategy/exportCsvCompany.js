const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

module.exports = class ExportCsvCompany {
  constructor(pathToFile, fileName) {
    this.fileName = fileName;
    this.pathToFile = pathToFile;

    this.csvWriter = this.initCsvWriter();
  }

  initCsvWriter(selectedColumns) {
    return createCsvWriter({
      path: path.join(this.pathToFile, `${this.fileName}.csv`),
      header: [
        { id: "name", title: "Nazwa" },
        { id: "post_code", title: "Kod pocztowy" },
        { id: "web_page", title: "Strona www" },
        { id: "phone_number", title: "Numer tel." },
        { id: "nip", title: "Nip" },
        { id: "email", title: "E-mail" },
        { id: "address", title: "Adres" },
        // { id: "country", title: "Panstwo" },
        // { id: "city", title: "Miasto" },
        //{ id: "voivodeship", title: "Wojewodztwo" },
        //{ id: "business_profiles", title: "Profile biznesowe" },
        { id: "aluminium_profiles", title: "Profile aluminiowe" },
        { id: "aluminium_fittings", title: "Okucia aluminiowe" },
        { id: "pcv_profiles", title: "Profile PCV" },
        { id: "pcv_fittings", title: "Okucia PCV" },
      ],
      append: true,
      fieldDelimiter: ";",
    });
  }

  async convert(componentList) {
    let componentListMap = componentList.map((value) => {
      return {
        ...value,
        //country: value.country.name,
        // city: value.city.name,
        // voivodeship: value.voivodeship?.name,
        // business_profiles: value.business_profiles
        //   .map((value) => value.name)
        //  .join(),
        aluminium_profiles: value.aluminium_profiles
          .map((value) => value.name)
          .join(),
        aluminium_fittings: value.aluminium_fittings
          .map((value) => value.name)
          .join(),
        pcv_profiles: value.pcv_profiles.map((value) => value.name).join(),
        pcv_fittings: value.pcv_fittings.map((value) => value.name).join(),
      };
    });
    await this.csvWriter.writeRecords(componentListMap);
  }
};
