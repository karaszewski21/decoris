const express = require("express");
const UsersController = require("../controllers/userController");
const AuthJwt = require("../middleware/authJwt");

const router = express.Router();

router.get("/get-users", AuthJwt.verifyToken, UsersController.getUsersList);

module.exports = router;
