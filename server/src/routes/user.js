const express = require("express");
const UserController = require("../controllers/UserController.js");

const router = express.Router();

// router.post("/auth", authController);

router.post("/login", UserController.login);

router.post("/register", UserController.register);

router.post("/auth", UserController.auth);

module.exports = router;
