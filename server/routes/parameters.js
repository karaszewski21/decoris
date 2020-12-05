const express = require("express");
const parametersController = require("../controllers/parameterController");

const router = express.Router();

router.get("/get-parameters", parametersController.getParameters);
router.post("/get-cities", parametersController.getCitiesByCountry);
router.post("/add-client-parameter", parametersController.addOrUpdateParameter);
router.delete("/delete-client-parameter", parametersController.deleteParameter);

module.exports = router;
