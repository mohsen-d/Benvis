const express = require("express");

const controller = require("../../controllers/settings.controller");

const route = express.Router();

// APIs
route.put("/", controller.updateSettings);

// Pages
route.get("/", controller.getSettings);

module.exports = route;
