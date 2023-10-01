const express = require("express");

const controller = require("../controllers/errors.controller");

const route = express.Router();

route.get("/error", controller.serverError);
route.get("*", controller.notFoundError);

module.exports = route;
