const express = require("express");
const clientController = require("../controllers/clientController");
const AuthJwt = require("../middleware/authJwt");

const router = express.Router();

router.get(
  "/get-client/:id",
  AuthJwt.verifyToken,
  clientController.getClientById
);
router.post(
  "/get-clients",
  AuthJwt.verifyToken,
  clientController.getFilteredClientsListByParametrs
);
router.post("/add-client", AuthJwt.verifyToken, clientController.createClient);
router.put(
  "/update-client",
  AuthJwt.verifyToken,
  clientController.updateClient
);
router.delete(
  "/delete-client/:id",
  AuthJwt.verifyToken,
  clientController.deleteClientById
);
router.get("/import", AuthJwt.verifyToken, clientController.importClient);
router.get("/export/:type", AuthJwt.verifyToken, clientController.exportClient);

module.exports = router;
