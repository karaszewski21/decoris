const express = require("express");
const clientController = require("../controllers/clientController");
const AuthJwt = require("../middleware/authJwt");

const router = express.Router();

router.get(
  "/get-client/:id",
  AuthJwt.verifyToken,
  clientController.getClientById
);

router.get("/import", AuthJwt.verifyToken, clientController.importClient);

router.post(
  "/get-clients",
  AuthJwt.verifyToken,
  clientController.getFilteredClientsListByParametrs
);
router.post("/add-client", AuthJwt.verifyToken, clientController.createClient);
router.post("/export", AuthJwt.verifyToken, clientController.exportClient);
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

module.exports = router;
