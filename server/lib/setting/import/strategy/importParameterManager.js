module.exports = class ImportParameterManager {
  constructor() {
    this._strategy = null;
  }

  set strategy(strategy) {
    this._strategy = strategy;
  }

  get strategy() {
    return this._strategy;
  }

  async importParameter() {
    return new Promise(async (resolve, reject) => {
      try {
        while (true) {
          let { done, value } = await this._strategy.import();

          if (done) {
            await this._strategy.save(value);
            break;
          } else {
            await this._strategy.save(value);
          }
        }

        resolve("Import copmanies is ready");
      } catch (error) {
        reject(error);
      }
    });
  }
};
