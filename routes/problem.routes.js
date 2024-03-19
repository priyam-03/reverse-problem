// problemRoutes.js

const express = require("express");
const router = express.Router();
const problemController = require("../controller/problemController");

// Problem solving route
router.post("/", problemController.solve);

module.exports = router;
