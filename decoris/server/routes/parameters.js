const express = require("express");
const parametersController = require("../controllers/parameterController");

const router = express.Router();

router.get("/get-parameters", parametersController.getParameters);
router.post("/get-cities", parametersController.getCitiesByCountry);
// router.post("/get-clients", clientController.getFilteredClientsListByParametrs);
// router.post("/add-client", clientController.createClient);
// router.put("/update-client/:id", clientController.updateClientById);
// router.delete("/delete-client/:id", clientController.deleteClientById);

module.exports = router;
