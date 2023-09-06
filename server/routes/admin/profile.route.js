const express = require("express");

const controller = require("../../controllers/profile.controller");

const route = express.Router();

// APIs
route.put("/changepassword", controller.changePassword);

// Pages
route.get("/", controller.getProfile);

module.exports = route;
