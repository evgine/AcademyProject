const express = require("express");
const router = express.Router();
const MainController = require("../controllers/main-controller")
const { authMiddleware } = require("../utils");

router.get("/", authMiddleware, MainController.home);

module.exports = router;
