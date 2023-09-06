const express = require("express");

const controller = require("../controllers/auth.controller");

const route = express.Router();

route.get("/login", controller.getLogin);
route.post("/login", controller.login);
route.post("/logout", controller.logout);

module.exports = route;
