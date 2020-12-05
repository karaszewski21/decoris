const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/login", AuthController.signin);
router.post("/register", AuthController.signup);

module.exports = router;
