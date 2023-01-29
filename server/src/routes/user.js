const express = require("express");
const UserController = require("../controllers/UserController.js");

const router = express.Router();

router.post("/login", UserController.login);

router.post("/signup", UserController.signup);

router.post("/auth", UserController.isLoggedIn);

router.post("/forgot-password", UserController.resetPasswordRequestController);

module.exports = router;
