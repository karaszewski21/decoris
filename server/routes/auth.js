const express = require("express");
const AuthController = require("../controllers/authController");
const AuthJwt = require("../middleware/authJwt");

const router = express.Router();

router.get("/login/:login", AuthController.checkLogin);
router.post("/login", AuthController.signin);
router.post("/register", AuthController.signup);

router.get("/get-accounts", AuthJwt.verifyToken, AuthController.getAccounts);
router.put(
  "/update-account",
  AuthJwt.verifyToken,
  AuthController.updateAccount
);
router.put("/active", AuthJwt.verifyToken, AuthController.activeAccount);
router.delete(
  "/delete-account/:id",
  AuthJwt.verifyToken,
  AuthController.deleteAccount
);

router.get("/get-users", AuthJwt.verifyToken, AuthController.getUsers);
router.put("/update-user", AuthJwt.verifyToken, AuthController.updateUser);
router.delete(
  "/delete-user/:id",
  AuthJwt.verifyToken,
  AuthController.deleteUser
);

module.exports = router;
