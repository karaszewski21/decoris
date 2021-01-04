const fs = require("fs");
const path = require("path");
const readline = require("readline");
var iconv = require("iconv-lite");
const models = require("../../../../db/models");

module.exports = class ImportCsvCityVoivodeship {
  constructor() {
    this.limit = 0;
    this.row = 0;
  }

  async import() {
    try {
      let pathToCsv = path.join(__dirname, "CityAll.csv");

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
          results.push(await this.orderCity(line));

          if (results.length === 100) {
            this.limit = this.row;
            return { done: false, value: results };
          }
        }
      }
      return { done: true, value: results };
    } catch (error) {
      throw error;
    }
  }

  orderCity(line) {
    let row = line.split(";");

    return new Promise((resolve, reject) => {
      let city = {
        cityName: row[0],
        voivodeshipName: row[1],
      };

      resolve(city);
    });
  }

  async save(cityList) {
    try {
      for (const line of cityList) {
        let city = await models.cities.findOne({
          where: { name: line.cityName },
          raw: true,
        });
        let voivodeship = await models.voivodeships.findOne({
          where: { name: line.voivodeshipName },
          raw: true,
        });

        if (city && voivodeship) {
          await models.cities.update(
            { voivodeship_id: voivodeship.id },
            { where: { id: city.id } }
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }
};
