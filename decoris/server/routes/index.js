module.exports = (app) => {
  app.use("/api/users", require("./user"));
  app.use("/api/clients", require("./client"));

  app.use("*", function (req, res) {
    res.status(404).send("path not found");
  });
  return app;
};
