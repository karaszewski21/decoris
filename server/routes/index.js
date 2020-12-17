module.exports = (app) => {
  app.use("/api/clients", require("./client"));
  app.use("/api/parameters", require("./parameters"));
  app.use("/api/account", require("./auth"));

  app.use("*", function (req, res) {
    res.status(404).send("path not found");
  });
  return app;
};
