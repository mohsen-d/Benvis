const express = require("express");

const controller = require("../../controllers/about.controller");

const route = express.Router();

// APIs
route.put("/", controller.updateInfo);

// Pages
route.get("/", controller.getInfo);

module.exports = route;
