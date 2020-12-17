const express = require("express");
const AuthController = require("../controllers/authController");
const AuthJwt = require("../middleware/authJwt");

const router = express.Router();

router.get("/login/:login", AuthController.checkLogin);
router.post("/login", AuthController.signin);
router.post("/register", AuthController.signup);

router.get("/accounts", AuthJwt.verifyToken, AuthController.getAccounts);
router.put("/account", AuthJwt.verifyToken, AuthController.updateAccount);
router.put(
  "/account/active",
  AuthJwt.verifyToken,
  AuthController.activeAccount
);
router.delete("/account", AuthJwt.verifyToken, AuthController.deleteUser);

router.get("/users", AuthJwt.verifyToken, AuthController.getUsers);
router.put("/user", AuthJwt.verifyToken, AuthController.updateUser);
router.delete("/user", AuthJwt.verifyToken, AuthController.deleteUser);

module.exports = router;
