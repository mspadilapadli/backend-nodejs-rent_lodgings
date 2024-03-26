const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/add-user", UserController.register);

router.post("/login", UserController.login);

module.exports = router;
