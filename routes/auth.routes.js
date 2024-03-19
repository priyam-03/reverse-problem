// loginRoutes.js

const express = require("express");
const router = express.Router();
const loginController = require("../controller/auth");

// Login route
router.post("/", loginController.loginUser);

module.exports = router;
