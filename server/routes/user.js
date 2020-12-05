const express = require("express");
const UsersController = require("../controllers/userController");

const router = express.Router();

router.get("/get-users", UsersController.getUsersList);

module.exports = router;
