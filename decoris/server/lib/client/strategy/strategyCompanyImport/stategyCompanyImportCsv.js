const fs = require("fs");
const path = require("path");
const readline = require("readline");

module.exports = class stategyCompanyImportCsv {
  constructor() {
    this.limit = 0;
    this.row = 0;
  }

  async importCompanies() {
    let pathToCsv = path.join(
      __dirname,
      "Klienci baza danych dla Patryka 06.10.csv"
    );

    const fileStream = fs.createReadStream(pathToCsv);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let results = [];
    this.row = 0;

    for await (const line of rl) {
      this.row++;

      if (this.limit < this.row) {
        results.push(await this.orderCompanyParmater(line));

        if (results.length === 10) {
          this.limit = this.row;
          return { done: false, value: results };
        }
      }
    }
    return { done: true, value: results };
  }

  orderCompanyParmater(line) {
    let row = line.split(",");

    let city = row[8] !== "ZAGRANICA" ? row[7] : "-";
    let voivodeship = row[8] !== "ZAGRANICA" ? row[8] : null;
    let country = row[8] === "ZAGRANICA" ? row[7] : "Polska";

    return new Promise((resolve, reject) => {
      let company = {
        parameters: {
          name: row[0],
          nip: null,
          email: null,
          web_page: null,
          phone_number: null,
          address: row[5],
          post_code: row[6],
          city: city,
          voivodeship: voivodeship,
          country: country,
        },
        employees: [],
        notes: [],
        business_profiles: [row[1]],
        aluminium_profiles: [row[9]],
        aluminium_fittings: [row[10]],
        pcv_profiles: [row[11]],
        pcv_fittings: [row[12]],
      };

      resolve(company);
    });
  }
};
