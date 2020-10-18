const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.post("/get-client/:name", clientController.getFilteredClientsListByName);
router.post("/get-clients", clientController.getFilteredClientsListByParametrs);
router.post("/add-client", clientController.createClient);
router.put("/update-client/:id", clientController.updateClient);
router.delete("/delete-client/:name", clientController.deleteClientById);

module.exports = router;
