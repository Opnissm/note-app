const express = require("express");
const UserController = require("../controllers/UserController.js");

const router = express.Router();

router.get("/logout", UserController.logout);

router.post("/login", UserController.login);

router.post("/signup", UserController.signup);

router.post("/signup", UserController.signup);

router.post("/auth", UserController.isLoggedIn);

router.post("/forgotPassword", UserController.resetPasswordRequestController);

router.post("/resetPassword", UserController.resetPasswordController);

router.post(
  "/validateRequestPasswordToken",
  UserController.validatePasswordResetTokenController
);

module.exports = router;
