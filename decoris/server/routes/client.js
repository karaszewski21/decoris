const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.get("/get-client/:id", clientController.getClientById);
router.post("/get-clients", clientController.getFilteredClientsListByParametrs);
router.post("/add-client", clientController.createClient);
router.put("/update-client", clientController.updateClient);
router.delete("/delete-client/:id", clientController.deleteClientById);

module.exports = router;
