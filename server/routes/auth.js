const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.get("/login/:login", AuthController.checkLogin);
router.post("/login", AuthController.signin);
router.post("/register", AuthController.signup);

module.exports = router;
