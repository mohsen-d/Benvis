const express = require("express");

const controller = require("../../controllers/profile.controller");

const route = express.Router();

// APIs
route.put("/password", controller.changePassword);

// Pages
route.get("/", controller.getProfile);

module.exports = route;
