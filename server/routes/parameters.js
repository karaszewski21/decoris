const express = require("express");
const parametersController = require("../controllers/parameterController");
const AuthJwt = require("../middleware/authJwt");

const router = express.Router();

router.get(
  "/get-parameters",
  AuthJwt.verifyToken,
  parametersController.getParameters
);

router.get(
  "/import/:fileType/:parameterType",
  AuthJwt.verifyToken,
  parametersController.import
);

router.post(
  "/get-cities",
  AuthJwt.verifyToken,
  parametersController.getCitiesByCountry
);
router.post(
  "/add-client-parameter",
  AuthJwt.verifyToken,
  parametersController.addOrUpdateParameter
);
router.delete(
  "/delete-client-parameter",
  AuthJwt.verifyToken,
  parametersController.deleteParameter
);

module.exports = router;
