const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { v4: uuidv4 } = require("uuid");
var iconv = require("iconv-lite");

module.exports = class ImportCsvCompany {
  constructor() {
    this.limit = 0;
    this.row = 0;
  }

  async importCompanies() {
    let pathToCsv = path.join(__dirname, "ClientAll.csv");

    const fileStream = fs
      .createReadStream(pathToCsv)
      .pipe(iconv.decodeStream("win1250"));
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

        if (results.length === 50) {
          this.limit = this.row;
          return { done: false, value: results };
        }
      }
    }
    return { done: true, value: results };
  }

  orderCompanyParmater(line) {
    let row = line.split(";");

    let city = row[9] === "ZAGRANICA" ? "-" : row[8];
    let country = row[9] === "ZAGRANICA" ? row[8] : "Polska";

    return new Promise((resolve, reject) => {
      let company = {
        parameters: {
          id: uuidv4(),
          name: row[0],
          nip: null,
          email: null,
          web_page: null,
          phone_number: null,
          address: row[6],
          post_code: row[7],
          city: city,
          country: country,
        },
        employees: [],
        notes: [],
        business_profiles: [row[1]],
        aluminium_profiles: [row[11]],
        aluminium_fittings: [row[12]],
        pcv_profiles: [row[13]],
        pcv_fittings: [row[14]],
      };

      resolve(company);
    });
  }
};
